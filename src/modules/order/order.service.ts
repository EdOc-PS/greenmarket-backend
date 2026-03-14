import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CartService } from '../cart/cart.service';
import { PrismaService } from '@/database/prisma.service';
import { OrderRepository } from './repositories/order.repository';
import { OrderStatus } from '@prisma/client';


@Injectable()
export class OrderService {
    constructor(
        private prisma: PrismaService,
        private cartService: CartService,
        private orderRepository: OrderRepository,
    ) { }

    async createOrder(userId: number) {

        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { status: true }
        });

        if (!user) {
            throw new NotFoundException('Usuário não encontrado');
        }

        if (!user.status) {
            throw new BadRequestException('Usuário inativo');
        }

        const cart = await this.cartService.getCart(userId);

        if (!cart || cart.itemsCart.length === 0) {
            throw new BadRequestException("Carrinho vazio");
        }

        const totalAmount = cart.itemsCart.reduce((total, item) => {
            return total + item.price * item.quantity;
        }, 0);

        return this.prisma.$transaction(async (tx) => {
            for (const item of cart.itemsCart) {
                const updated = await tx.product.updateMany({
                    where: {
                        id: item.productId,
                        stock: {
                            gte: item.quantity
                        }
                    },
                    data: {
                        stock: {
                            decrement: item.quantity
                        }
                    }
                });

                if (updated.count === 0) {
                    throw new BadRequestException(`Produto ${item.productName} não tem estoque suficiente`);
                }
            }

            // Criar itens do pedido
            const order = await tx.order.create({
                data: {
                    userId,
                    totalAmount
                }
            });

            for (const item of cart.itemsCart) {
                await tx.orderItem.create({
                    data: {
                        orderId: order.id,
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.price
                    }
                });

            }

            // Limpar o carrinho
            await tx.cartItem.deleteMany({
                where: { cartId: cart.id }
            });

            return order;
        });

    }

    async getOrdersByUser(userId: number) {
        const orders = await this.orderRepository.findByUser(userId);

        return orders.map(order => ({
            id: order.id,
            status: order.status,
            totalAmount: order.totalAmount,
            createdAt: order.createdAt,
            items: order.itemsOrder.map(item => ({
                productId: item.productId,
                productName: item.product.name,
                quantity: item.quantity,
                price: item.price,
            })),
        }));
    }

    async updateOrderStatus(orderId: number, newStatus: OrderStatus) {
        const order = await this.orderRepository.findById(orderId);

        if (!order) {
            throw new NotFoundException('Pedido não encontrado');
        }

        if (order.status === newStatus) {
            return order;
        }

        const allowedTransitions: Record<OrderStatus, OrderStatus[]> = {
            PENDENTE: [OrderStatus.PAGA, OrderStatus.CANCELADA],
            PAGA: [OrderStatus.ENVIADO, OrderStatus.CANCELADA],
            ENVIADO: [OrderStatus.CONCLUIDA],
            CONCLUIDA: [],
            CANCELADA: []
        };

        const canTransition = allowedTransitions[order.status].includes(newStatus);

        if (!canTransition) {
            throw new BadRequestException(
                `Transição inválida: ${order.status} -> ${newStatus}`
            );
        }

        return this.orderRepository.updateStatus(orderId, newStatus);
    }

}
