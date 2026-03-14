import { IsBoolean, IsNumber, IsOptional, IsString, Min, MinLength } from "class-validator"


export class CreateProductDto {
    @IsString()
    @MinLength(3, { message: 'O nome deve conter pelo menos 3 caracteres' })
    name!: string

    @IsString()
    @IsOptional()
    description?: string

    @IsString()
    @IsOptional()
    imageUrl?: string

    @IsNumber()
    @Min(0, { message: 'O preço não pode ser negativo' })
    price!: number

    @IsNumber()
    @Min(0, { message: 'O estoque não pode ser negativo' })
    stock!: number

    @IsOptional()
    @IsBoolean()
    status?: boolean

    @IsNumber()
    categoryId!: number;
}