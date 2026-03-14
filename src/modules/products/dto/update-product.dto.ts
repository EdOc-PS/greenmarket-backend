import { IsBoolean, IsNumber, IsOptional, IsString, Min, MinLength } from "class-validator"

export class UpdateProductDto {
    @IsOptional()
    @IsString()
    @MinLength(3)
    name?: string

    @IsOptional()
    @IsString()
    @IsOptional()
    description?: string

    @IsOptional()
    @IsString()
    @IsOptional()
    imageUrl?: string

    @IsOptional()
    @IsNumber()
    @Min(0)
    price?: number

    @IsOptional()
    @IsNumber()
    @Min(0)
    stock?: number

    @IsOptional()
    @IsBoolean()
    status?: boolean

    @IsOptional()
    @IsNumber()
    categoryId?: number;
}