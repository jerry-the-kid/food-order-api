import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from '../orders/order.entity';
import { OptionDetails } from '../option_details/option-details.entity';
import { Item } from '../items/item.entity';

@Entity()
export class OrderDetails {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  quantity: number;
  @Column({ nullable: true })
  message: string;
  @Column({ nullable: true })
  totalPrice: number;

  @ManyToOne(() => Order, (order) => order.orderDetails, {
    onDelete: 'CASCADE',
  })
  order: Order;

  @ManyToOne(() => Item, (item) => item.orderDetails)
  item: Item;

  @ManyToMany(
    () => OptionDetails,
    (optionDetails) => optionDetails.orderDetails,
  )
  @JoinTable()
  optionsDetails: OptionDetails[];
}
