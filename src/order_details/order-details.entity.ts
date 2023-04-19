import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Order } from '../orders/order.entity';
import { OptionDetails } from '../option_details/option-details.entity';

@Entity()
export class OrderDetails {
  @PrimaryColumn()
  id: number;
  @Column()
  quantity: number;
  @Column()
  message: string;

  @ManyToOne(() => Order, (order) => order.orderDetails)
  order: Order;

  @ManyToMany(
    () => OptionDetails,
    (optionDetails) => optionDetails.orderDetails,
  )
  @JoinTable()
  optionsDetails: OptionDetails[];
}
