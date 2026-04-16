import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('utilisateur')
export class Utilisateur {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @Column({ nullable: true })
  nom: string;

  @Column({ nullable: true })
  prenom: string;

  @Column({ unique: true, nullable: true })
  mail: string;

  @Column({ nullable: true })
  sexe: string;

  @Column({ name: 'date_naissance', nullable: true })
  dateNaissance: string;

  @Column({ name: 'mot_de_passe', nullable: true })
  motDePasse: string;
}
