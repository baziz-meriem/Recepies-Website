import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EtapeRecette } from '../entities/etape-recette.entity';
import { Recette } from '../entities/recette.entity';
import { Saison } from '../entities/saison.entity';
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Recette, EtapeRecette, Saison])],
  controllers: [RecipesController],
  providers: [RecipesService],
})
export class RecipesModule {}
