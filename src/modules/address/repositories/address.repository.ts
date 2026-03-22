import { PrismaService } from '@/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { UpdateAddressDto } from '../dto/update-address.dto';
import { CreateAddressDto } from '../dto/create-address.dto';

@Injectable()
export class AddressRepository {
    constructor(
        private readonly prisma: PrismaService,
    ) { }

    findById(addressId: number) {
        return this.prisma.address.findUnique({
            where: { id: Number(addressId) }
        });
    }

    findAllByUser(userId: number) {
        return this.prisma.address.findMany({
            where: { userId: Number(userId) }
        });
    }

    create(newAddress: CreateAddressDto, userId: number) {
        return this.prisma.address.create({
            data: { ...newAddress, userId }
        })
    }

    delete(addressId: number) {
        return this.prisma.address.delete({
            where: { id: Number(addressId) }
        });
    }

    update(addressId: number, updatedAddress: UpdateAddressDto) {
        return this.prisma.address.update({
            where: { id: Number(addressId) },
            data: updatedAddress
        })
    }

}
