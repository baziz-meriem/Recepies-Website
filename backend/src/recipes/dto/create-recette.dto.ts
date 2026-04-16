import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateRecetteDto {
  @IsString()
  categorie: string;

  @IsString()
  titre: string;

  @IsString()
  image: string;

  /** @deprecated Utiliser `videos` ; conservé pour compatibilité. */
  @IsOptional()
  @IsString()
  video?: string;

  /** Plusieurs liens (YouTube, Vimeo, fichier uploadé…). */
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  videos?: string[];

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
