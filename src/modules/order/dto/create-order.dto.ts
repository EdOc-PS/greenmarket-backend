import { IsInt } from "class-validator";

export class CreateOrderDto {

    @IsInt()
    userId!: number;

}