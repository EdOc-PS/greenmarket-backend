import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { type User, UsersService } from './users.service';


@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    getUsers(): User[] {
        return this.usersService.getUsers();
    }

    @Get(":id")
    getUser(@Param("id") id: number): User | string {
        return this.usersService.getUser(id);
    }

    @Post()
    createUser(@Body() newUser: User): User {
        return this.usersService.createUser(newUser);
    }

    @Delete(":id")
    deleteUser(@Param("id") id: number): object {
        return this.usersService.deleteUser(id);
    }

    @Patch(":id")
    updateUser(@Param("id") id: number, @Body() updatedUser: User ): User {
        return this.usersService.updateUser(id, updatedUser);
    }
}
