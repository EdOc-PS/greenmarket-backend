import { Role } from "@common/enums/enum"
import { IsDateString, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, MinLength } from "class-validator"

export class CreateUserDto {
    @IsString()
    @MinLength(3)
    name!: string

    @IsEmail()
    @IsNotEmpty()
    email!: string

    @IsString()
    @MinLength(6)
    password!: string

    @IsString()
    @MinLength(11)
    @IsOptional()
    cpf?: string

    @IsDateString()
    @IsNotEmpty()
    birthday!: string

    @IsOptional()
    @IsPhoneNumber('BR')
    phone?: string

    @IsEnum(Role)
    role!: Role
}