import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Param,
    Body
} from '@nestjs/common';

import { CartService } from './cart.service';
import { AddCartItemDto } from './dto/add-cart-item.dto';
import { CartRepository } from './repositories/cart.repository';
import { CartItemRepository } from './repositories/cart-item.repository';

@Controller('cart')
export class CartController {

    constructor(
        private readonly cartService: CartService,
        private cartItemRepository: CartItemRepository,
    
    ) { }

    @Get(':userId')
    getCart(
        @Param('userId') userId: string
    ) {
        return this.cartService.getCart(Number(userId));
    }

    @Post(':userId/items')
    addItem(
        @Param('userId') userId: string,
        @Body() adddCartItemDto: AddCartItemDto
    ) {
        return this.cartService.addItem(Number(userId), adddCartItemDto);
    }

    @Patch('items/:itemId')
    updateItem(
        @Param('itemId') itemId: string,
        @Body('quantity') quantity: number
    ) {
        return this.cartItemRepository.updateItem(
            Number(itemId),
            quantity
        );
    }

    @Delete('items/:itemId')
    removeItem(
        @Param('itemId') itemId: string
    ) {
        return this.cartItemRepository.delete(Number(itemId));
    }

}