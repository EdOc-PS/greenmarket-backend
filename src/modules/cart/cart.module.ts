import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartRepository } from './repositories/cart.repository';
import { CartItemRepository } from './repositories/cart-item.repository';
import { PrismaService } from '@/database/prisma.service';
import { ProductsModule } from '../products/products.module';
import { UsersModule } from '../users/users.module';
import { CartController } from './cart.controller';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Module({
    imports: [ProductsModule, UsersModule],
    controllers: [CartController],
    providers: [
        CartService,
        CartRepository,
        CartItemRepository,
        PrismaService,
        JwtAuthGuard
    ],
    exports: [CartService]
})

export class CartModule { }