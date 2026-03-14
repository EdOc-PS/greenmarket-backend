import { PrismaService } from "@/database/prisma.service";
import { Injectable } from "@nestjs/common";
import { OrderStatus } from "@prisma/client";

@Injectable()
export class OrderRepository {
    constructor(private prisma: PrismaService) { }

    create(userId: number, totalAmount: number) {
        return this.prisma.order.create({
            data: {
                userId,
                totalAmount
            }
        });
    }

    findByUser(userId: number) {
        return this.prisma.order.findMany({
            where: { userId },
            include: {
                itemsOrder: {
                    include: {
                        product: true
                    }
                }
            }
        });
    }

    findById(orderId: number) {
        return this.prisma.order.findUnique({
            where: { id: orderId }
        });
    }

    updateStatus(orderId: number, status: OrderStatus) {
        return this.prisma.order.update({
            where: { id: orderId },
            data: { status }
        });
    }
}