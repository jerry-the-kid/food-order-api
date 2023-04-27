import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Restaurant } from '../restaurants/restaurant.entity';
import { Account } from '../auth/account.entity';
import { OrderDetails } from '../order_details/order-details.entity';

@Entity()
export class Order {
  @PrimaryColumn()
  id: number;
  @Column()
  status: number;
  @Column()
  totalPrice: number;
  @Column({ nullable: true })
  createdAt: Date;
  @Column({ nullable: true })
  updatedAt: Date;
  @ManyToOne(() => Restaurant, (restaurant) => restaurant.orders, {
    onDelete: 'SET NULL',
  })
  restaurant: Restaurant;

  @ManyToOne(() => Account, (account) => account.orders, {
    onDelete: 'SET NULL',
  })
  account: Account;

  @OneToMany(() => OrderDetails, (orderDetails) => orderDetails.order)
  orderDetails: OrderDetails[];

  @BeforeInsert()
  setCreatedAt() {
    this.createdAt = new Date();
  }

  @BeforeUpdate()
  setUpdatedAt() {
    this.updatedAt = new Date();
  }
}
