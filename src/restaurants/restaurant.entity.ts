import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Account } from '../auth/account.entity';

import { Order } from '../orders/order.entity';
import { Section } from '../sections/section.entity';
import { Cuisine } from '../cuisines/cuisine.entity';
import { Option } from '../options/option.entity';

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  address: string;
  @Column()
  startWorkingTime: string;
  @Column({ nullable: true })
  imgUrl: string;
  @Column()
  endWorkingTime: string;
  @Column()
  slug: string;

  @OneToOne(() => Account, (account) => account.restaurant, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  account: Account;

  @ManyToMany(() => Cuisine, (cuisines) => cuisines.restaurants)
  cuisines: Cuisine[];

  @OneToMany(() => Restaurant, (restaurant) => restaurant.orders)
  orders: Order[];

  @OneToMany(() => Option, (option) => option.restaurant, {
    onDelete: 'CASCADE',
  })
  options: Option[];

  @OneToMany(() => Section, (section) => section.restaurant, {
    onDelete: 'CASCADE',
  })
  sections: Section[];
}
