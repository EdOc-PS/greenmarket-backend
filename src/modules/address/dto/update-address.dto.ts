import { IsNumber, IsOptional, isString, IsString, MaxLength, Min, MinLength } from "class-validator";

export class UpdateAddressDto {

    @IsOptional()
    @IsString()
    @MinLength(3, { message: 'A rua deve conter pelo menos 3 caracteres' })
    street?: string;

    @IsOptional()
    @IsString()
    city?: string;

    @IsOptional()
    @IsString()
    state?: string;

    @IsOptional()
    @IsString()
    country?: string;

    @IsOptional()
    @IsString()
    @MinLength(1)
    @MaxLength(4)
    number?: string;

    @IsOptional()
    @IsString()
    @MinLength(8, { message: 'O código postal deve conter 8 caracteres' })
    @MaxLength(9, { message: 'O código postal deve conter no máximo 9 caracteres' })
    zipCode?: string;
}