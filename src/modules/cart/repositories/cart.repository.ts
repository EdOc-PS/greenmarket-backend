import { PrismaService } from "@/database/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CartRepository {
    constructor(private prisma: PrismaService) { }

    getCartByUser(userId: number) {
        return this.prisma.cart.findUnique({
            where: { userId },
            include: {
                itemsCart: {
                    include: {
                        product: true
                    }
                }
            }
        });
    }

    create(userId: number) {
        return this.prisma.cart.create({
            data: { userId },
            include: {
                itemsCart: {
                    include: {
                        product: true
                    }
                }
            }
        });
    }
}