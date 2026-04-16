import { IsOptional, IsString } from 'class-validator';

export class CreateRecetteDto {
  @IsString()
  categorie: string;

  @IsString()
  titre: string;

  @IsString()
  image: string;

  @IsString()
  video: string;

  @IsString()
  description: string;

  @IsString()
  saison: string;

  @IsString()
  fete: string;

  @IsString()
  temps_preparation: string;

  @IsString()
  temps_cuisson: string;

  @IsString()
  temps_repos: string;

  @IsString()
  calories: string;

  @IsString()
  difficulte: string;
}
