import { PrismaService } from '@/database/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateProductDto } from '../dto/update-product.dto';
import { CreateProductDto } from '../dto/create-product.dto';
import { CategoriesService } from '../../categories/categories.service';

@Injectable()
export class ProductsRepository {
    constructor(
        private prisma: PrismaService,
        private categoriesRepository: CategoriesService
    ) { }

    findAll() {
        return this.prisma.product.findMany();
    }

    findOne(id: number) {
        return this.prisma.product.findUnique({
            where: { id: Number(id) },
        });
    }

    async delete(id: number) {
        return this.prisma.product.delete({
            where: { id: Number(id) }
        });
    }

    async update(id: number, updatedProduct: UpdateProductDto) {
        return this.prisma.product.update({
            where: { id: Number(id) },
            data: updatedProduct
        });
    }

    async create(newProduct: CreateProductDto) {
        
        await this.categoriesRepository.findByIdOrFail(newProduct.categoryId);
        
        return this.prisma.product.create({
            data: newProduct
        });
    }

}
