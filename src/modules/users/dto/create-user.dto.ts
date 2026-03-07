import { Role } from "@common/enums/enum"
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, MinLength } from "class-validator"
import { Transform } from 'class-transformer'

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

    @Transform(({ value }) => {
        if (typeof value === 'string') {
            const [day, month, year] = value.split('/')
            return new Date(`${year}-${month}-${day}`)
        }
        return value
    })
    @IsDate()
    @IsNotEmpty()
    birthdate!: Date

    @IsOptional()
    @IsPhoneNumber('BR')
    phone?: string

    @IsEnum(Role)
    role!: Role
}