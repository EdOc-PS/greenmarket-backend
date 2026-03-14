import { PrismaService } from '@/database/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoriesRepository {
    constructor(private prisma: PrismaService) {}
    
    findById(id: number) {
        return this.prisma.category.findUnique({
            where: { id: Number(id) },
        });
    }

}
