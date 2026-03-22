import { CreateProductDto } from "@modules/products/dto/create-product.dto";
import { UpdateProductDto } from "@modules/products/dto/update-product.dto";
import { applyDecorators } from "@nestjs/common";
import { ApiBody, ApiOperation } from '@nestjs/swagger';



export function FindDocs() {
    return applyDecorators(
        ApiOperation({ summary: 'Lista todos os produtos' })
    );
}

export function FindByIdDocs() {
    return applyDecorators(
        ApiOperation({ summary: 'Busca um produto por ID' })
    );
}

export function CreateDocs() {
    return applyDecorators(
        ApiOperation({ summary: 'Cria um novo produto' }),
        ApiBody({
            type: CreateProductDto,
            examples: {
                createProduct: {
                    summary: 'Exemplo de criação de produto',
                    value: {
                        name: 'Planta Organico 500g',
                        description: 'Cafe torrado em graos com certificacao organica',
                        imageUrl: '',
                        price: 29.9,
                        stock: 100,
                        status: true,
                        categoryId: 1,
                    },
                },
            },
        })
    );
}

export function UpdateDocs() {
    return applyDecorators(
        ApiOperation({ summary: 'Atualiza um produto por ID' }),
        ApiBody({
            type: UpdateProductDto,
            examples: {
                updateProduct: {
                    summary: 'Exemplo de atualização de produto',
                    value: {
                        price: 24.9,
                        stock: 80,
                        status: true,
                    },
                },
            },
        })
    );
}

export function DeleteDocs() {
    return applyDecorators(
        ApiOperation({ summary: 'Remove um produto por ID' })
    );
}