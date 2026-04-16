import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ingredients')
export class Ingredient {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @Column({ nullable: true })
  nom: string;

  @Column({ nullable: true })
  saison: string;

  @Column({ nullable: true })
  titre: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  healthy: string;
}
