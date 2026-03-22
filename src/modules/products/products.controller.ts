import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiResponse } from '@common/dto/response.dto';
import { Product } from '@prisma/client';
import { ProductsRepository } from './repositories/products.repository';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FindDocs, FindByIdDocs, CreateDocs, DeleteDocs, UpdateDocs } from '@swagger/products';

//UseGuards(JwtAuthGuard) é usado para proteger as rotas, garantindo que apenas usuários autenticados possam acessá-las. 
//ApiBearerAuth é usado para indicar que as rotas deste controlador requerem autenticação via token Bearer (JWT).
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@ApiTags('Products')


@Controller('products')
export class ProductsController {
    constructor(private productsRepository: ProductsRepository) { }


    @FindDocs()
    @Get()
    async getProducts() {
        const products = await this.productsRepository.findAll();

        return {
            success: true,
            message: 'Sucesso ao trazer os produtos!',
            object: products
        }
    }


    @FindByIdDocs()
    @Get(":id")
    async getUser(@Param("id") id: number) {

        const product = await this.productsRepository.findOne(id);

        return {
            success: true,
            message: 'Sucesso ao trazer os produtos!',
            object: product
        }
    }


    @CreateDocs()
    @Post()
    async createProduct(@Body() newProduct: CreateProductDto): Promise<ApiResponse<Product>> {
        const product = await this.productsRepository.create(newProduct);

        return {
            success: true,
            message: 'Produto criado com sucesso!',
            object: product
        }
    }


    @DeleteDocs()
    @Delete(":id")
    async deleteUser(@Param("id") id: number) {
        await this.productsRepository.delete(id);

        return {
            success: true,
            message: 'Produto deletado com sucesso!',
        }
    }


    @UpdateDocs()
    @Patch(":id")
    async updateUser(@Param("id") id: number, @Body() updatedProduct: UpdateProductDto) {
        const product = await this.productsRepository.update(id, updatedProduct);
        return {
            success: true,
            message: 'Produto atualizado com sucesso!',
            object: product
        }
    }
}
