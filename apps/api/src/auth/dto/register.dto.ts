import { IsDateString, IsEmail, IsIn, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  nom: string;

  @IsString()
  prenom: string;

  @IsEmail()
  mail: string;

  @IsIn(['homme', 'femme'])
  sexe: string;

  @IsDateString()
  dateNaissance: string;

  @IsString()
  @MinLength(4)
  motDePasse: string;
}
