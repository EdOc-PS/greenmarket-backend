import { Transform } from "class-transformer"
import { IsBoolean, IsDateString, IsEmail, IsOptional, IsPhoneNumber, IsString, MinLength } from "class-validator"

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
    @Transform(({ value }) => {
        if (typeof value !== "string") return value
        const match = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/)
        if (!match) return value
        const [, day, month, year] = match
        return `${year}-${month}-${day}`
    })
    @IsDateString()
    birthdate?: string

    @IsOptional()
    @IsPhoneNumber('BR')
    phone?: string

    @IsOptional()
    @IsBoolean()
    status?: boolean

}