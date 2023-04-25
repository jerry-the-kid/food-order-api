import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Option } from '../options/option.entity';
import { OrderDetails } from '../order_details/order-details.entity';

@Entity()
export class OptionDetails {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ nullable: true })
  price: number;
  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Option, (option) => option.optionDetails)
  option: Option;

  @ManyToMany(() => OrderDetails, (orderDetails) => orderDetails.optionsDetails)
  orderDetails: OrderDetails[];
}
