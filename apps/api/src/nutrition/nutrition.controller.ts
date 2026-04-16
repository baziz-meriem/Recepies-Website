import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { NutritionService } from './nutrition.service';

@Controller('nutrition')
export class NutritionController {
  constructor(private readonly nutrition: NutritionService) {}

  @Get('ingredients')
  ingredients() {
    return this.nutrition.findAll();
  }

  @Get('ingredients/:id')
  ingredient(@Param('id', ParseIntPipe) id: number) {
    return this.nutrition.findOneWithDetails(id);
  }
}
