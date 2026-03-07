import { Controller, Get } from '@nestjs/common';

@Controller('products')
export class ProductsController {
    @Get()
    getProducts(): string {
        return "Esse é o produto 1";
    }

    @Get("ola")
    getOla(): string {
        return "Esse é o produto 1";
    }
}
