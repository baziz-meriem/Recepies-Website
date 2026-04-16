import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EtapeRecette } from './etape-recette.entity';

@Entity('recettes')
export class Recette {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @Column({ nullable: true })
  categorie: string;

  @Column()
  titre: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  video: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  saison: string;

  @Column({ nullable: true })
  fete: string;

  @Column({ name: 'temps_preparation', nullable: true })
  tempsPreparation: string;

  @Column({ name: 'temps_cuisson', nullable: true })
  tempsCuisson: string;

  @Column({ name: 'temps_repos', nullable: true })
  tempsRepos: string;

  @Column({ name: 'temps_total', nullable: true })
  tempsTotal: string;

  @Column({ nullable: true })
  calories: string;

  @Column({ nullable: true })
  difficulte: string;

  @Column({ nullable: true })
  notation: string;

  @Column({ type: 'tinyint', nullable: true, name: 'valide' })
  valide: number;

  @OneToMany(() => EtapeRecette, (e: EtapeRecette) => e.recette)
  etapes: EtapeRecette[];
}
