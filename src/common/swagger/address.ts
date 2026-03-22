import { CreateAddressDto } from "@modules/address/dto/create-address.dto";
import { UpdateAddressDto } from "@modules/address/dto/update-address.dto";
import { applyDecorators } from "@nestjs/common";
import { ApiBody, ApiOperation } from '@nestjs/swagger';



export function FindDocs() {
    return applyDecorators(
        ApiOperation({ summary: 'Lista os endereços do usuário autenticado' })
    );
}

export function CreateDocs() {
    return applyDecorators(
        ApiOperation({ summary: 'Cria um novo endereço para o usuário autenticado' }),
        ApiBody({
            type: CreateAddressDto,
            examples: {
                createAddress: {
                    summary: 'Exemplo de criação de endereço',
                    value: {
                        street: 'Rua das Flores',
                        city: 'Sao Paulo',
                        state: 'SP',
                        country: 'Brasil',
                        number: '123',
                        zipCode: '01001-000',
                    },
                },
            },
        })
    );
}

export function UpdateDocs() {
    return applyDecorators(
        ApiOperation({ summary: 'Atualiza um endereço por ID' }),
        ApiBody({
            type: UpdateAddressDto,
            examples: {
                updateAddress: {
                    summary: 'Exemplo de atualização de endereço',
                    value: {
                        street: 'Avenida Paulista',
                        number: '1000',
                        zipCode: '01310-100',
                    },
                },
            },
        })
    );
}

export function DeleteDocs() {
    return applyDecorators(
        ApiOperation({ summary: 'Remove um endereço por ID' })
    );
}