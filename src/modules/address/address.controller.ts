import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiResponse } from '@common/dto/response.dto';
import { Address } from '@prisma/client';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { type AuthenticatedRequest } from '@common/interfaces/authenticated';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateDocs, DeleteDocs, FindDocs, UpdateDocs } from '@swagger/address';
import { AddressService } from './address.service';

//UseGuards(JwtAuthGuard) é usado para proteger as rotas, garantindo que apenas usuários autenticados possam acessá-las. 
//ApiBearerAuth é usado para indicar que as rotas deste controlador requerem autenticação via token Bearer (JWT).
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@ApiTags('Address')


@Controller('user/address')
export class AddressController {
    constructor(private readonly addressService: AddressService) { }

    @FindDocs()
    @Get()
    async findAllByUser(@Req() req: AuthenticatedRequest) {
        const addresses = await this.addressService.findAllByUser(Number(req.user.userId));
        return {
            success: true,
            message: 'Endereços encontrados com sucesso!',
            object: addresses
        };
    }

    @CreateDocs()
    @Post()
    async createAddress(
        @Req() req: AuthenticatedRequest,
        @Body() newAddress: CreateAddressDto
    ): Promise<ApiResponse<Address>> {
        const address = await this.addressService.create(
            newAddress,
            req.user.userId
        );

        return {
            success: true,
            message: 'Endereço criado com sucesso!',
            object: address
        }
    }

    @DeleteDocs()
    @Delete(":id")
    async delete(@Param("id") id: number) {
        await this.addressService.delete(id);

        return {
            success: true,
            message: 'Endereço excluído com sucesso!'
        };

    }

    @UpdateDocs()
    @Patch(":id")
    async update(@Param("id") id: number, @Body() updatedAddress: UpdateAddressDto) {
        const address = await this.addressService.update(id, updatedAddress);

        return {
            success: true,
            message: 'Endereço atualizado com sucesso!',
            object: address
        }
    }
}
