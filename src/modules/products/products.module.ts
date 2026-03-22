import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { PrismaService } from '@/database/prisma.service';
import { ProductsRepository } from './repositories/products.repository';
import { CategoriesModule } from '../categories/categories.module';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Module({
  imports: [CategoriesModule],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    ProductsRepository,
    PrismaService,
    JwtAuthGuard
  ],
  exports: [ProductsService]
})
export class ProductsModule { }
  