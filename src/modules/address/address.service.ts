import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AddressRepository } from './repositories/address.repository';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressService {

    constructor(
        private readonly addressRepository: AddressRepository,
        private readonly usersService: UsersService
    ) { }

    async findByIdOrFail(addressId: number) {
        const address = await this.addressRepository.findById(addressId);

        if (!address) {
            throw new NotFoundException('Endereço não encontrado');
        }

        return address;
    }

    async findAllByUser(userId: number) {
        await this.usersService.findByIdOrFail(userId);

        return this.addressRepository.findAllByUser(userId);
    }

    async create(newAddress: CreateAddressDto, userId: number) {
        await this.usersService.findByIdOrFail(userId);

        return this.addressRepository.create(newAddress, userId);
    }

    async delete(addressId: number) {
        await this.findByIdOrFail(addressId);

        return this.addressRepository.delete(addressId);
    }

    async update(addressId: number, updatedAddress: UpdateAddressDto) {
        await this.findByIdOrFail(addressId);

        return this.addressRepository.update(addressId, updatedAddress);
    }
}
