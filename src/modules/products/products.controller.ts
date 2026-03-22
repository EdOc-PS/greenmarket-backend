import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiResponse } from '@common/dto/response.dto';
import { Product } from '@prisma/client';
import { ProductsRepository } from './repositories/products.repository';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

//UseGuards(JwtAuthGuard) é usado para proteger as rotas, garantindo que apenas usuários autenticados possam acessá-las. 
//ApiBearerAuth é usado para indicar que as rotas deste controlador requerem autenticação via token Bearer (JWT).
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')


@Controller('products')
export class ProductsController {
    constructor(private productsRepository: ProductsRepository) { }


    @Get()
    getProducts() {
        return this.productsRepository.findAll();
    }


    @Get(":id")
    getUser(@Param("id") id: number) {
        return this.productsRepository.findOne(id);
    }


    @Post()
    async createProduct(@Body() newProduct: CreateProductDto): Promise<ApiResponse<Product>> {
        const product = await this.productsRepository.create(newProduct);

        return {
            success: true,
            message: 'Produto criado com sucesso!',
            object: product
        }
    }


    @Delete(":id")
    deleteUser(@Param("id") id: number) {
        return this.productsRepository.delete(id);
    }


    @Patch(":id")
    updateUser(@Param("id") id: number, @Body() updatedProduct: UpdateProductDto) {
        return this.productsRepository.update(id, updatedProduct);
    }
}
