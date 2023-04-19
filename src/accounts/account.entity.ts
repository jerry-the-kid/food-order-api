import { Column, Entity, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { Restaurant } from '../restaurants/restaurant.entity';
import { Order } from '../orders/order.entity';

@Entity()
export class Account {
  @PrimaryColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  otp: string;
  @Column()
  password: string;
  @Column()
  googleId: string;
  @Column()
  facebookId: string;
  @Column()
  role: string;
  @Column()
  lat: number;
  @Column()
  lng: number;
  @Column()
  createdAt: Date;
  @Column()
  updatedAt: Date;

  @OneToOne(() => Restaurant, (restaurant) => restaurant.account)
  restaurant: Restaurant;

  @OneToMany(() => Order, (order) => order.account)
  orders: Order[];
}
