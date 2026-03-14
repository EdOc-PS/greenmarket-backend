import { PrismaService } from "@/database/prisma.service";
import { Injectable } from "@nestjs/common";
import { CreateOrderItemDto } from "../dto/create-order-item.dto";

@Injectable()
export class OrderItemRepository {

  constructor(private prisma: PrismaService) { }

  create(data: CreateOrderItemDto) {
    return this.prisma.orderItem.create({
      data
    });
  }
}