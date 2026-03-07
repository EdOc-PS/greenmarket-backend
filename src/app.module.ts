import { Module } from '@nestjs/common';
import { UsersModule } from '@/modules/users/users.module';
import { ProductsModule } from '@/modules/products/products.module';



@Module({
  imports: [UsersModule, ProductsModule],
  controllers: [],
  providers: [],
})

export class AppModule {}
