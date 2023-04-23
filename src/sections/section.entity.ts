import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Restaurant } from '../restaurants/restaurant.entity';
import { Item } from '../items/item.entity';

@Entity()
export class Section {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @ManyToOne(() => Restaurant, (restaurant) => restaurant.sections)
  restaurant: Restaurant;

  @OneToMany(() => Item, (item) => item.section)
  items: Item[];
}
