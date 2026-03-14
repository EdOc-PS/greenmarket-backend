import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order.dto';

@Controller('orders')
export class OrderController {

    constructor(
        private orderService: OrderService,
    ) { }

    @Post()
    create(@Body() createOrderDto: CreateOrderDto) {
        return this.orderService.createOrder(Number(createOrderDto.userId));
    }

    @Get('user/:id')
    getUserOrders(@Param('id', ParseIntPipe) userId: number) {
        return this.orderService.getOrdersByUser(userId);
    }

    @Patch(':id/status')
    updateStatus(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateOrderStatusDto) {
        return this.orderService.updateOrderStatus(id, dto.status);
    }
}