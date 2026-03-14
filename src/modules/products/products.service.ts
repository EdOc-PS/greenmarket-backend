import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { ProductsRepository } from "./repositories/products.repository";

@Injectable()
export class ProductsService {

    constructor(private productRepository: ProductsRepository) { }

    async validateProduct(productId: number) {

        const product = await this.productRepository.findOne(productId);

        if (!product) {
            throw new NotFoundException("Produto não encontrado");
        }

        if (!product.status) {
            throw new BadRequestException("Produto inativo");
        }

        return product;
    }

    validateStock(productStock: number, quantity: number) {
        if (quantity > productStock) {
            throw new BadRequestException("Quantidade maior que o estoque disponível");
        }
    }
}