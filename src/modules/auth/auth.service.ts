import * as bcrypt from 'bcrypt'

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from '@/database/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';


@Injectable()
export class AuthService {

    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService
    ) { }

    async login(loginRequest: LoginDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: loginRequest.email,
            },
        });

        if (!user) throw new UnauthorizedException('Email não encontrado, verifique e tente novamente');

        if (!user.status) throw new UnauthorizedException('Usuário inativo');

        const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);

        if (!isPasswordValid) throw new UnauthorizedException('Credenciais inválidas');

        const token = this.jwtService.sign({ userId: user.id, email: user.email });

        return {
            access_token: token,
            user: user
        }
    }

    async create(newUser: CreateUserDto) {
        const existingUser = await this.prisma.user.findUnique({
            where: {
                email: newUser.email,
            },
        });

        if (existingUser) throw new UnauthorizedException('Email já registrado, por favor utilize outro email');

        const hashPassword = await bcrypt.hash(newUser.password, 10)

        return this.prisma.user.create({
            data: {
                ...newUser,
                password: hashPassword
            }
        });
    }
}
