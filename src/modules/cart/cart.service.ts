import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { CartRepository } from "./repositories/cart.repository";
import { CartItemRepository } from "./repositories/cart-item.repository";
import { AddCartItemDto } from "./dto/add-cart-item.dto";
import { ProductsService } from "../products/products.service";
import { UsersService } from "../users/users.service";

@Injectable()
export class CartService {
    constructor(
        private cartRepository: CartRepository,
        private cartItemRepository: CartItemRepository,
        private productService: ProductsService,
        private userSerivce: UsersService
    ) { }

    async getOrCreateCart(userId: number) {

        let cart = await this.cartRepository.getCartByUser(userId);

        if (!cart) {
            cart = await this.cartRepository.create(userId);
        }

        return cart;
    }

    async addItem(userId: number, cartItemDto: AddCartItemDto) {

        //validar se o usuário existe e está ativo
        await this.userSerivce.validateActiveUser(userId);

        const cart = await this.getOrCreateCart(userId);

        //validar se o produto existe
        const product = await this.productService.validateProduct(cartItemDto.productId);

        const existingItem = await this.cartItemRepository.findItem(
            cart.id,
            cartItemDto.productId
        );

        if (existingItem) {
            const finalQuantity = existingItem.quantity + cartItemDto.quantity;

            //validar estoque com a quantidade final (já existente + nova)
            this.productService.validateStock(product.stock, finalQuantity);

            return this.cartItemRepository.updateItem(
                existingItem.id,
                finalQuantity
            );
        }

        //validar estoque para item novo
        this.productService.validateStock(product.stock, cartItemDto.quantity);

        return this.cartItemRepository.create(
            cart.id,
            cartItemDto.productId,
            cartItemDto.quantity
        );
    }

    async getCart(userId: number) {

        const cart = await this.cartRepository.getCartByUser(userId);

        if (!cart) {
            return null;
        }

        return {
            id: cart.id,
            userId: cart.userId,
            itemsCart: cart.itemsCart.map(item => ({
                id: item.id,
                quantity: item.quantity,
                productId: item.productId,
                productName: item.product.name,
                price: item.product.price,
                stock: item.product.stock
            }))
        };
    }

    private async getItemByIdOrFail(itemId: number) {
        const item = await this.cartItemRepository.findById(itemId);

        if (!item) {
            throw new NotFoundException('Item do carrinho não encontrado');
        }

        return item;
    }

    private assertItemBelongsToUser(itemUserId: number, userId: number) {
        if (itemUserId !== userId) {
            throw new ForbiddenException('Item do carrinho não pertence a este usuário');
        }
    }

    async updateItem(userId: number, itemId: number, quantity: number) {

        await this.userSerivce.validateActiveUser(userId);

        const item = await this.getItemByIdOrFail(itemId);
        this.assertItemBelongsToUser(item.cart.userId, userId);

        const product = await this.productService.validateProduct(item.productId);
        this.productService.validateStock(product.stock, quantity);

        return this.cartItemRepository.updateItem(itemId, quantity);
    }

    async removeItem(userId: number, itemId: number) {

        await this.userSerivce.validateActiveUser(userId);

        const item = await this.getItemByIdOrFail(itemId);
        this.assertItemBelongsToUser(item.cart.userId, userId);

        return this.cartItemRepository.delete(itemId);
    }


}