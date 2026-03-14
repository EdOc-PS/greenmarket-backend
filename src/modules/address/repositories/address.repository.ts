import { PrismaService } from '@/database/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateAddressDto } from '../dto/update-address.dto';
import { CreateAddressDto } from '../dto/create-address.dto';
import { AddressService } from '../address.service';
import { UsersService } from '../../users/users.service';


@Injectable()
export class AddressRepository {
    constructor(
        private prisma: PrismaService,
        private addressService: AddressService,
        private usersService: UsersService
    ) { }

    async findAllByUser(userId: number) {
        await this.usersService.findByIdOrFail(userId);

        return this.prisma.address.findMany({
            where: { userId: Number(userId) }
        });
    }

    async create(newAddress: CreateAddressDto) {
        await this.usersService.findByIdOrFail(newAddress.userId);

        return this.prisma.address.create({
            data: newAddress
        })
    }

    async delete(addressId: number) {
        await this.addressService.findByIdOrFail(addressId);

        return this.prisma.address.delete({
            where: { id: Number(addressId) }
        });
    }

    async update(addressId: number, updatedAddress: UpdateAddressDto) {
        await this.addressService.findByIdOrFail(addressId);

        return this.prisma.address.update({
            where: { id: Number(addressId) },
            data: updatedAddress
        })
    }

}
