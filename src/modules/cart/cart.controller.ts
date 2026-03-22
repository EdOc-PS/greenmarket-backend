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
    getCart(@Req() req: AuthenticatedRequest) {
        return this.cartService.getCart(Number(req.user.userId));
    }

    @AddItemDocs()
    @Post('items')
    addItem(
        @Req() req: AuthenticatedRequest,
        @Body() adddCartItemDto: AddCartItemDto
    ) {
        return this.cartService.addItem(Number(req.user.userId), adddCartItemDto);
    }

    @UpdateItemDocs()
    @Patch('/items/:itemId')
    updateItem(
        @Req() req: AuthenticatedRequest,
        @Param('itemId') itemId: string,
        @Body() updateItemDto: UpdateItemDto
    ) {
        return this.cartService.updateItem(
            Number(req.user.userId),
            Number(itemId),
            updateItemDto.quantity
        );
    }

    @RemoveItemDocs()
    @Delete('items/:itemId')
    removeItem(
        @Req() req: AuthenticatedRequest,
        @Param('itemId') itemId: string
    ) {
        return this.cartService.removeItem(Number(req.user.userId), Number(itemId));
    }

}