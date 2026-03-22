import { Role } from "@common/enums/enum"
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, MinLength } from "class-validator"
import { Transform } from 'class-transformer'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateUserDto {
    @ApiProperty({
        example: 'Joao Silva',
        minLength: 3,
        description: 'Nome completo do usuário',
    })
    @IsString()
    @MinLength(3)
    name!: string

    @ApiProperty({
        example: 'joao@email.com',
        description: 'Email único do usuário',
    })
    @IsEmail()
    @IsNotEmpty()
    email!: string

    @ApiProperty({
        example: 'senha123',
        minLength: 6,
        description: 'Senha com no mínimo 6 caracteres',
    })
    @IsString()
    @MinLength(6)
    password!: string

    @ApiPropertyOptional({
        example: '12345678901',
        minLength: 11,
        description: 'CPF do usuário sem pontuação',
    })
    @IsString()
    @MinLength(11)
    @IsOptional()
    cpf?: string

    @ApiProperty({
        example: '21/03/2001',
        description: 'Data de nascimento no formato dd/mm/yyyy',
    })
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

    @ApiPropertyOptional({
        example: '+5511999999999',
        description: 'Telefone no padrão E.164 (Brasil)',
    })
    @IsOptional()
    @IsPhoneNumber('BR')
    phone?: string

    @ApiProperty({
        example: 'CLIENT',
        enum: Role,
        description: 'Papel do usuário no sistema',
    })
    @IsEnum(Role)
    role!: Role
}