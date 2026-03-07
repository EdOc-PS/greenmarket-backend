import * as bcrypt from 'bcrypt'

import { PrismaService } from '@/database/prisma.service';
import { Injectable } from '@nestjs/common';

import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    findAll() {
        return this.prisma.user.findMany();
    }

    async create(newUser: CreateUserDto) {
        const hashPassword = await bcrypt.hash(newUser.password, 10)
        
        return this.prisma.user.create({
            data: {
                ...newUser,
                password: hashPassword
            }
        });
    }

    findOne(id: number) {
        return this.prisma.user.findUnique({
            where: { id: Number(id) },
        });
    }

    async delete(id: number) {
        return this.prisma.user.delete({
            where: { id: Number(id) }
        });
    }

    async update(id: number, updatedUser: UpdateUserDto) {
        return this.prisma.user.update({
            where: { id: Number(id) },
            data: updatedUser
        });
    }

}
