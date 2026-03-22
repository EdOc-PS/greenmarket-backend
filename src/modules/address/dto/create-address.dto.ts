import { IsNumber, IsString, Max, MaxLength, Min, MinLength } from "class-validator"


export class CreateAddressDto {
    @IsString()
    @MinLength(3, { message: 'A rua deve conter pelo menos 3 caracteres' })
    street!: string

    @IsString()
    city!: string

    @IsString()
    state!: string

    @IsString()
    country!: string

    @IsString()
    @MinLength(1)
    @MaxLength(4)
    number!: string;

    @IsString()
    @MinLength(8, { message: 'O código postal deve conter 8 caracteres' })
    @MaxLength(9, { message: 'O código postal deve conter no máximo 9 caracteres' })
    zipCode!: string

}



