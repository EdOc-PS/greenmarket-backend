import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoriesRepository } from './repositories/categories.repository';

@Injectable()
export class CategoriesService {
    constructor(private categoriesRepository: CategoriesRepository) { }

    async findByIdOrFail(categoryId: number) {
        const category = await this.categoriesRepository.findById(categoryId);

        if (!category) {
            throw new NotFoundException('Categoria não encontrada');
        }

        return category;
    }
}
