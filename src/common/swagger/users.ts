import { UpdateUserDto } from '@modules/users/dto/update-user.dto';
import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

export function FindDocs() {
    return applyDecorators(
        ApiOperation({ summary: 'Lista todos os usuários' }),
    );
}

export function FindByIdDocs() {
    return applyDecorators(
        ApiOperation({ summary: 'Busca um usuário por ID' }),
    );
}

export function DeleteDocs() {
    return applyDecorators(
        ApiOperation({ summary: 'Remove um usuário por ID' }),
    );
}

export function UpdateDocs() {
    return applyDecorators(
        ApiOperation({ summary: 'Atualiza um usuário por ID' }),
        ApiBody({
            type: UpdateUserDto,
            examples: {
                updateUser: {
                    summary: 'Exemplo de atualização de usuário',
                    value: {
                        name: 'Joao Silva',
                        phone: '+5511999999999',
                    },
                },
            },
        }),
    );
}
