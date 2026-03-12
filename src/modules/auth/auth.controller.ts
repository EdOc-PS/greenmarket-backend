import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiResponse } from '@/common/dto/response.dto';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    async login(@Body() loginRequest: LoginDto) {
        const response = await this.authService.login(loginRequest);

        return {
            success: true,
            message: 'Login realizado com sucesso',
            object: response
        }
    }

    @Post('register')
    async createUser(@Body() newUser: CreateUserDto): Promise<ApiResponse<User>> {

        const user = await this.authService.create(newUser);

        return {
            success: true,
            message: 'Usuário criado com sucesso',
            object: user
        }
    }
}
