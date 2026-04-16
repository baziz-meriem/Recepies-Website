import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientDesc } from '../entities/ingredient-desc.entity';
import { Ingredient } from '../entities/ingredient.entity';
import { NutritionController } from './nutrition.controller';
import { NutritionService } from './nutrition.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ingredient, IngredientDesc])],
  controllers: [NutritionController],
  providers: [NutritionService],
})
export class NutritionModule {}
