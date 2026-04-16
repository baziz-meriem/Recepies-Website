import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('news_desc')
export class NewsDesc {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @Column({ name: 'news_id' })
  newsId: number;

  @Column({ nullable: true })
  titre: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  image: string;
}
