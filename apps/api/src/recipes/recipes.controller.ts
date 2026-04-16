import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateRecetteDto } from './dto/create-recette.dto';
import { FilterRecipesDto } from './dto/filter-recipes.dto';
import { UpdateRecetteDto } from './dto/update-recette.dto';
import { RecipesService } from './recipes.service';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipes: RecipesService) {}

  @Get('meta')
  meta() {
    return this.recipes.meta();
  }

  @Get('filter-options/:column')
  filterOptions(@Param('column') column: string) {
    if (column !== 'fete' && column !== 'saison') {
      return [];
    }
    return this.recipes.distinctColumn(column);
  }

  @Get('home/:category')
  homeCategory(
    @Param('category') category: 'plats' | 'entrees' | 'desserts' | 'boissons',
  ) {
    return this.recipes.byHomeCategory(category);
  }

  @Post('filter')
  filter(@Body() dto: FilterRecipesDto) {
    return this.recipes.filter(dto);
  }

  @Get('admin')
  @UseGuards(JwtAuthGuard)
  findAllAdmin() {
    return this.recipes.findAllForAdmin();
  }

  @Get()
  findAll() {
    return this.recipes.findAllPublic();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.recipes.findOneWithDetails(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateRecetteDto) {
    return this.recipes.create(dto);
  }

  @Patch(':id/validate')
  @UseGuards(JwtAuthGuard)
  validate(@Param('id', ParseIntPipe) id: number) {
    return this.recipes.validate(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateRecetteDto,
  ) {
    return this.recipes.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.recipes.remove(id);
  }
}
