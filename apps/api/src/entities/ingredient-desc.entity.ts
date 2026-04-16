import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ingredients_desc')
export class IngredientDesc {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @Column({ name: 'ingredient_id' })
  ingredientId: number;

  @Column({ nullable: true })
  titre: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  image: string;
}
