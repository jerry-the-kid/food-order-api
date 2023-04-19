import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Account } from '../accounts/account.entity';
import { Cuisines } from '../cuisines/cuisines.entity';
import { Order } from '../orders/order.entity';
import { Section } from '../sections/section.entity';

@Entity()
export class Restaurant {
  @PrimaryColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  address: string;
  @Column()
  phone: string;
  @Column()
  startWorkingTime: string;
  @Column()
  endWorkingTime: string;
  @Column()
  lat: number;
  @Column()
  lng: number;

  @OneToOne(() => Account, (account) => account.restaurant, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  account: Account;

  @ManyToMany(() => Cuisines, (cuisines) => cuisines.restaurants)
  cuisines: Cuisines[];

  @OneToMany(() => Restaurant, (restaurant) => restaurant.orders)
  orders: Order[];

  @OneToMany(() => Section, (section) => section.restaurant, {
    onDelete: 'CASCADE',
  })
  sections: Section[];
}
