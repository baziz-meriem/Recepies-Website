import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Recette } from './recette.entity';

@Entity('etapes_recette')
export class EtapeRecette {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @Column({ name: 'recette_id' })
  recetteId: number;

  @ManyToOne(() => Recette, (r: Recette) => r.etapes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'recette_id' })
  recette: Recette;

  @Column({ nullable: true })
  titre: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  image: string;
}
