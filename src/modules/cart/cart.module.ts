import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartRepository } from './repositories/cart.repository';
import { CartItemRepository } from './repositories/cart-item.repository';
import { PrismaService } from '@/database/prisma.service';
import { ProductsModule } from '../products/products.module';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [ProductsModule, UsersModule],
    providers: [
        CartService,
        CartRepository,
        CartItemRepository,
        PrismaService
    ],
    exports: [CartService]
})

export class CartModule { }