import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { UpdateOrderStatusDto } from './dto/update-order.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { type AuthenticatedRequest } from '@/common/interfaces/authenticated';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateDocs, FindByUserDocs, UpdateStatusDocs } from '@swagger/order';

//UseGuards(JwtAuthGuard) é usado para proteger as rotas, garantindo que apenas usuários autenticados possam acessá-las. 
//ApiBearerAuth é usado para indicar que as rotas deste controlador requerem autenticação via token Bearer (JWT).
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@ApiTags('Orders')


@Controller('orders')
export class OrderController {

    constructor(
        private orderService: OrderService,
    ) { }

    @CreateDocs()
    @Post()
    async create(@Req() req: AuthenticatedRequest) {

        const order = await this.orderService.createOrder(Number(req.user.userId));
        return {
            success: true,
            message: 'Pedido criado com sucesso!',
            object: order
        };
    }

    @FindByUserDocs()
    @Get('user')
    async getUserOrders(@Req() req: AuthenticatedRequest) {
        const order = await this.orderService.getOrdersByUser(Number(req.user.userId));
        return {
            success: true,
            message: 'Pedidos encontrados com sucesso!',
            object: order
        };
    }

    @UpdateStatusDocs()
    @Patch(':id/status')
    async updateStatus(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateOrderStatusDto) {
        const order = await this.orderService.updateOrderStatus(id, dto.status);
        return {
            success: true,
            message: 'Status do pedido atualizado com sucesso!',
            object: order
        };
    }
}