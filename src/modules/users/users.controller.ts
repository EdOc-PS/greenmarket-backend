import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Req, UseGuards } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

//UseGuards(JwtAuthGuard) é usado para proteger as rotas, garantindo que apenas usuários autenticados possam acessá-las. 
//ApiBearerAuth é usado para indicar que as rotas deste controlador requerem autenticação via token Bearer (JWT).
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }


    @Get()
    async findAll() {
        const users = await this.usersService.findAll();

        return {
            success: true,
            message: 'Usuários encontrados com sucesso!',
            object: users
        }
    }

    @Get(":id")
    async findUser(@Param("id", ParseIntPipe) id: number) {

        const user = await this.usersService.findUser(id);

        return {
            success: true,
            message: 'Usuário encontrado com sucesso!',
            object: user
        }
    }


    @Delete(":id")
    deleteUser(@Param("id", ParseIntPipe) id: number) {
        return this.usersService.delete(id);
    }

    @Patch(":id")
    updateUser(@Param("id", ParseIntPipe) id: number, @Body() updatedUser: UpdateUserDto) {
        return this.usersService.update(id, updatedUser);
    }

}
