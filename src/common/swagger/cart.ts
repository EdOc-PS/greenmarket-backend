import { AddCartItemDto } from '@modules/cart/dto/add-cart-item.dto';
import { UpdateItemDto } from '@modules/cart/dto/update-cart-item.dto';
import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

export function FindDocs() {
    return applyDecorators(
        ApiOperation({ summary: 'Busca o carrinho do usuário autenticado' }),
    );
}

export function AddItemDocs() {
    return applyDecorators(
        ApiOperation({ summary: 'Adiciona um item ao carrinho do usuário autenticado' }),
        ApiBody({
            type: AddCartItemDto,
            examples: {
                addItem: {
                    summary: 'Exemplo de item para adicionar ao carrinho',
                    value: {
                        productId: 1,
                        quantity: 2,
                    },
                },
            },
        }),
    );
}

export function UpdateItemDocs() {
    return applyDecorators(
        ApiOperation({ summary: 'Atualiza a quantidade de um item do carrinho' }),
        ApiBody({
            type: UpdateItemDto,
            examples: {
                updateItem: {
                    summary: 'Exemplo de atualização de item do carrinho',
                    value: {
                        quantity: 3,
                    },
                },
            },
        }),
    );
}

export function RemoveItemDocs() {
    return applyDecorators(
        ApiOperation({ summary: 'Remove um item do carrinho por ID' }),
    );
}
