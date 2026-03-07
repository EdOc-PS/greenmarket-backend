import { IsDateString, IsEmail, IsOptional, IsPhoneNumber, IsString, MinLength } from "class-validator"

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @MinLength(3)
    name?: string

    @IsOptional()
    @IsEmail()
    email?: string

    @IsOptional()
    @IsString()
    @MinLength(6)
    password?: string

    @IsOptional()
    @IsString()
    @MinLength(11)
    cpf?: string

    @IsOptional()
    @IsDateString()
    birthday?: string

    @IsOptional()
    @IsPhoneNumber('BR')
    phone?: string

}