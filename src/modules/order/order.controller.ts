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
    create(@Req() req: AuthenticatedRequest) {
        return this.orderService.createOrder(Number(req.user.userId));
    }

    @FindByUserDocs()
    @Get('user')
    getUserOrders(@Req() req: AuthenticatedRequest) {
        return this.orderService.getOrdersByUser(Number(req.user.userId));
    }

    @UpdateStatusDocs()
    @Patch(':id/status')
    updateStatus(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateOrderStatusDto) {
        return this.orderService.updateOrderStatus(id, dto.status);
    }
}