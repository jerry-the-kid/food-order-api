import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { Restaurant } from '../restaurants/restaurant.entity';

@Entity()
export class Cuisines {
  @PrimaryColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  slug: string;

  @ManyToMany(() => Restaurant, (restaurant) => restaurant.cuisines)
  @JoinTable()
  restaurants: Restaurant[];
}
