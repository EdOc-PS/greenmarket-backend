import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiResponse } from '@/common/dto/response.dto';
import { User } from '@prisma/client';


@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get()
    getUsers() {
        return this.usersService.findAll();
    }

    @Get(":id")
    getUser(@Param("id") id: number) {
        return this.usersService.findOne(id);
    }

    @Post()
    async createUser(@Body() newUser: CreateUserDto): Promise<ApiResponse<User>> {

        const user = await this.usersService.create(newUser);

        return {
            success: true,
            message: 'Usuário criado com sucesso',
            object: user
        }
    }

    @Delete(":id")
    deleteUser(@Param("id") id: number) {
        return this.usersService.delete(id);
    }

    @Patch(":id")
    updateUser(@Param("id") id: number, @Body() updatedUser: UpdateUserDto) {
        return this.usersService.update(id, updatedUser);
    }
}
