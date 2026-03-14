import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiResponse } from '@/common/dto/response.dto';
import { Address } from '@prisma/client';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AddressRepository } from './repositories/address.repository';

@Controller('user/address')
export class AddressController {
    constructor(private addressRepository: AddressRepository) { }

    @Get(":userId")
    findAllByUser(@Param("userId") userId: number) {
        return this.addressRepository.findAllByUser(userId);
    }

    @Post()
    async createAddress(@Body() newAddress: CreateAddressDto): Promise<ApiResponse<Address>> {
        const address = await this.addressRepository.create(newAddress);

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
