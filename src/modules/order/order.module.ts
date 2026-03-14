import { Module } from '@nestjs/common';
import { PrismaService } from '@/database/prisma.service';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderRepository } from './repositories/order.repository';
import { CartModule } from '../cart/cart.module';


@Module({
    imports: [CartModule],
    controllers: [OrderController],
    providers: [
        OrderService,
        OrderRepository,
        PrismaService
    ],
    exports: [OrderService]
})
export class OrderModule { }
