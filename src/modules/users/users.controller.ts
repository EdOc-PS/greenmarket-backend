import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repositories/users.repository';


@Controller('users')
export class UsersController {
    constructor(private usersRepository: UsersRepository) { }

    @Get()
    getUsers() {
        return this.usersRepository.findAll();
    }

    @Get(":id")
    getUser(@Param("id") id: number) {
        return this.usersRepository.findOne(id);
    }

    @Delete(":id")
    deleteUser(@Param("id") id: number) {
        return this.usersRepository.delete(id);
    }

    @Patch(":id")
    updateUser(@Param("id") id: number, @Body() updatedUser: UpdateUserDto) {
        return this.usersRepository.update(id, updatedUser);
    }
}
