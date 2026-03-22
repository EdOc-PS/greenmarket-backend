import { UpdateOrderStatusDto } from '@modules/order/dto/update-order.dto';
import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

export function CreateDocs() {
    return applyDecorators(
        ApiOperation({ summary: 'Cria um novo pedido para o usuário autenticado' }),
    );
}

export function FindByUserDocs() {
    return applyDecorators(
        ApiOperation({ summary: 'Lista pedidos do usuário autenticado' }),
    );
}

export function UpdateStatusDocs() {
    return applyDecorators(
        ApiOperation({ summary: 'Atualiza o status de um pedido' }),
        ApiBody({
            type: UpdateOrderStatusDto,
            examples: {
                updateOrderStatus: {
                    summary: 'Exemplo de atualização de status do pedido',
                    value: {
                        status: 'PAID',
                    },
                },
            },
        }),
    );
}
