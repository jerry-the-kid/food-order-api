import {
  BeforeInsert,
  BeforeUpdate,
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

  @Column()
  type: string;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.options)
  restaurant: Restaurant;

  @ManyToMany(() => Item, (item) => item.options)
  @JoinTable()
  items: Item[];

  @OneToMany(() => OptionDetails, (optionDetails) => optionDetails.option)
  optionDetails: OptionDetails[];

  // Should be test
  @BeforeInsert()
  @BeforeUpdate()
  setTypeBeforeInsertAndUpdate() {
    if (this.optional == false && this.limit == 1) {
      this.type = 'checkbox';
    }
    this.type = 'checkbox';
  }
}
