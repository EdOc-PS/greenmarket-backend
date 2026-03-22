import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiResponse } from '@/common/dto/response.dto';
import { Address } from '@prisma/client';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AddressRepository } from './repositories/address.repository';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { type AuthenticatedRequest } from '@/common/interfaces/authenticated';
import { ApiBearerAuth } from '@nestjs/swagger';

//UseGuards(JwtAuthGuard) é usado para proteger as rotas, garantindo que apenas usuários autenticados possam acessá-las. 
//ApiBearerAuth é usado para indicar que as rotas deste controlador requerem autenticação via token Bearer (JWT).
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')


@Controller('user/address')
export class AddressController {
    constructor(private addressRepository: AddressRepository) { }

    @Get()
    findAllByUser(@Req() req: AuthenticatedRequest) {
        return this.addressRepository.findAllByUser(Number(req.user.userId));
    }

    @Post()
    async createAddress(
        @Req() req: AuthenticatedRequest,
        @Body() newAddress: CreateAddressDto
    ): Promise<ApiResponse<Address>> {
        const address = await this.addressRepository.create(
            newAddress,
            req.user.userId
        );

        return {
            success: true,
            message: 'Endereço criado com sucesso!',
            object: address
        }
    }

    @Delete(":id")
    delete(@Param("id") id: number) {
        return this.addressRepository.delete(id);
    }

    @Patch(":id")
    async update(@Param("id") id: number, @Body() updatedAddress: UpdateAddressDto) {
        const address = await this.addressRepository.update(id, updatedAddress);

        return {
            success: true,
            message: 'Endereço atualizado com sucesso!',
            object: address
        }
    }
}
