import { Module } from '@nestjs/common';
import { UsersController } from '@/users/users.controller';
import { UsersService } from '@/users/users.service';
import { ProductsController } from '@/products/products.controller';
import { ProductsService } from '@/products/products.service';



@Module({
  imports: [],
  controllers: [UsersController, ProductsController],
  providers: [UsersService, ProductsService],
})

export class AppModule {}
