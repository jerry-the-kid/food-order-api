import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Item } from '../items/item.entity';
import { OptionDetails } from '../option_details/option-details.entity';
import { Restaurant } from '../restaurants/restaurant.entity';

@Entity()
export class Option {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  limit: number;
  @Column({ default: false })
  optional: boolean;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.options)
  restaurant: Restaurant;

  @ManyToMany(() => Item, (item) => item.options)
  @JoinTable()
  items: Item[];

  @OneToMany(() => OptionDetails, (optionDetails) => optionDetails.option)
  optionDetails: OptionDetails[];
}
