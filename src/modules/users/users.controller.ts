import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';


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

    @Delete(":id")
    deleteUser(@Param("id") id: number) {
        return this.usersService.delete(id);
    }

    @Patch(":id")
    updateUser(@Param("id") id: number, @Body() updatedUser: UpdateUserDto) {
        return this.usersService.update(id, updatedUser);
    }
}
