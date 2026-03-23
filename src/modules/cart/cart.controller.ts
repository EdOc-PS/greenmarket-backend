import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Req } from '@nestjs/common';

import { CartService } from './cart.service';
import { AddCartItemDto } from './dto/add-cart-item.dto';
import { UpdateItemDto } from './dto/update-cart-item.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { type AuthenticatedRequest } from '@common/interfaces/authenticated';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AddItemDocs, FindDocs, RemoveItemDocs, UpdateItemDocs } from '@swagger/cart';

//UseGuards(JwtAuthGuard) é usado para proteger as rotas, garantindo que apenas usuários autenticados possam acessá-las. 
//ApiBearerAuth é usado para indicar que as rotas deste controlador requerem autenticação via token Bearer (JWT).
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@ApiTags('Cart')


@Controller('user/cart')
export class CartController {

    constructor(
        private readonly cartService: CartService,
    ) { }

    @FindDocs()
    @Get()
    async getCart(@Req() req: AuthenticatedRequest) {
        const cart = await this.cartService.getCart(Number(req.user.userId));
        return {
            success: true,
            message: 'Carrinho encontrado com sucesso!',
            object: cart
        };
    }

    @AddItemDocs()
    @Post('items')
    async addItem(
        @Req() req: AuthenticatedRequest,
        @Body() adddCartItemDto: AddCartItemDto
    ) {
        const cartItem = await this.cartService.addItem(Number(req.user.userId), adddCartItemDto);
        return {
            success: true,
            message: 'Item adicionado ao carrinho com sucesso!',
            object: cartItem
        };
    }

    @UpdateItemDocs()
    @Patch('/items/:itemId')
    async updateItem(
        @Req() req: AuthenticatedRequest,
        @Param('itemId') itemId: string,
        @Body() updateItemDto: UpdateItemDto
    ) {
        const cartItem = await this.cartService.updateItem(
            Number(req.user.userId),
            Number(itemId),
            updateItemDto.quantity
        );
        return {
            success: true,
            message: 'Item atualizado no carrinho com sucesso!',
            object: cartItem
        };
    }

    @RemoveItemDocs()
    @Delete('items/:itemId')
    async removeItem(
        @Req() req: AuthenticatedRequest,
        @Param('itemId') itemId: string
    ) {
        await this.cartService.removeItem(Number(req.user.userId), Number(itemId));
        return {
            success: true,
            message: 'Item removido do carrinho com sucesso!'
        };
    }
}