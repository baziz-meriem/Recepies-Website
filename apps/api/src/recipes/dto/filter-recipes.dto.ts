import {
  IsArray,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class FilterRecipesDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  categorie?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  saison?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  fete?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  notation?: string[];

  @IsOptional()
  @IsNumberString()
  minimum_prep?: string;

  @IsOptional()
  @IsNumberString()
  maximum_prep?: string;

  @IsOptional()
  @IsNumberString()
  minimum_cuiss?: string;

  @IsOptional()
  @IsNumberString()
  maximum_cuiss?: string;
}
