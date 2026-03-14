import { PrismaService } from "@/database/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CartItemRepository {

  constructor(private prisma: PrismaService) { }

  findItem(cartId: number, productId: number) {
    return this.prisma.cartItem.findFirst({
      where: {
        cartId,
        productId
      }
    });
  }

  create(cartId: number, productId: number, quantity: number) {
    return this.prisma.cartItem.create({
      data: {
        cartId,
        productId,
        quantity
      }
    });
  }

  updateItem(id: number, quantity: number) {
    return this.prisma.cartItem.update({
      where: { id },
      data: { quantity }
    });
  }

  delete(id: number) {
    return this.prisma.cartItem.delete({
      where: { id }
    });
  }

}