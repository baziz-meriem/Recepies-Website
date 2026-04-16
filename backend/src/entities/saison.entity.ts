import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('saison')
export class Saison {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @Column({ nullable: true })
  nom: string;
}
