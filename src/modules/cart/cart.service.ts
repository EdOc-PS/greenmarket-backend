import { Injectable } from "@nestjs/common";
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

        //validar se o usuário existe
        await this.userSerivce.findByIdOrFail(userId);

        const cart = await this.getOrCreateCart(userId);

        //validar se o produto existe e se tem estoque suficiente
        const product = await this.productService.validateProduct(cartItemDto.productId);

        //validar se a quantidade solicitada é menor ou igual ao estoque disponível
        this.productService.validateStock(product.stock, cartItemDto.quantity);

        const existingItem = await this.cartItemRepository.findItem(
            cart.id,
            cartItemDto.productId
        );

        if (existingItem) {
            return this.cartItemRepository.updateItem(
                existingItem.id,
                existingItem.quantity + cartItemDto.quantity
            );
        }

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
                price: item.product.price
            }))
        };
    }


}