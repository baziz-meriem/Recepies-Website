import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IngredientDesc } from '../entities/ingredient-desc.entity';
import { Ingredient } from '../entities/ingredient.entity';

@Injectable()
export class NutritionService {
  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredients: Repository<Ingredient>,
    @InjectRepository(IngredientDesc)
    private readonly ingredientDesc: Repository<IngredientDesc>,
  ) {}

  findAll() {
    return this.ingredients.find({ order: { id: 'ASC' } });
  }

  async findOneWithDetails(id: number) {
    const ingredient = await this.ingredients.findOne({ where: { id } });
    if (!ingredient) {
      throw new NotFoundException();
    }
    const details = await this.ingredientDesc.find({
      where: { ingredientId: id },
    });
    return { ingredient, details };
  }
}
