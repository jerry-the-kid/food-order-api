import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Restaurant } from '../restaurants/restaurant.entity';

@Entity()
export class Cuisine {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  slug: string;

  @ManyToMany(() => Restaurant, (restaurant) => restaurant.cuisines)
  @JoinTable()
  restaurants: Restaurant[];
}
