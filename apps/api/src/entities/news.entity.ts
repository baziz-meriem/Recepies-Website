import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('news')
export class NewsArticle {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  titre: string;

  @Column({ nullable: true })
  date: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  video: string;
}
