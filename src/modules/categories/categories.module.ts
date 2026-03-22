import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CategoriesRepository } from './repositories/categories.repository';
import { PrismaService } from '@/database/prisma.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


@Module({
    controllers: [CategoriesController],
    providers: [
        CategoriesService,
        CategoriesRepository,
        PrismaService,
        JwtAuthGuard
    ],
    exports: [CategoriesService]
})
export class CategoriesModule { }
