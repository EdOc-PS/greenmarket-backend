import { Module } from '@nestjs/common';
import { UsersModule } from '@/modules/users/users.module';
import { ProductsModule } from '@/modules/products/products.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { AddressModule } from './modules/address/address.module';
import { CartModule } from './modules/cart/cart.module';
import { OrderModule } from './modules/order/order.module';



@Module({
  imports: [UsersModule, ProductsModule, AuthModule, CategoriesModule, AddressModule, CartModule, OrderModule],
  controllers: [],
  providers: [],
})

export class AppModule {}
