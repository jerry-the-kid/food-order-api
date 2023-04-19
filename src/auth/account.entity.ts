import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Restaurant } from '../restaurants/restaurant.entity';
import { Order } from '../orders/order.entity';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  email: string;
  @Column({ nullable: true })
  otp: string;
  @Column({ nullable: true })
  otpExpires: Date;
  @Column({ nullable: true })
  googleId: string;
  @Column({ nullable: true })
  facebookId: string;
  @Column({ nullable: true })
  role: string;
  @Column({ nullable: true })
  lat: number;
  @Column({ nullable: true })
  lng: number;
  @Column({ nullable: true })
  createdAt: Date;
  @Column({ nullable: true })
  updatedAt: Date;

  @Column({ nullable: true })
  hashRt: string;

  @OneToOne(() => Restaurant, (restaurant) => restaurant.account)
  restaurant: Restaurant;

  @OneToMany(() => Order, (order) => order.account)
  orders: Order[];
}
