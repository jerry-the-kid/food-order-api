import { Column, Entity, ManyToMany, ManyToOne, PrimaryColumn } from 'typeorm';
import { Option } from '../options/option.entity';
import { OrderDetails } from '../order_details/order-details.entity';

@Entity()
export class OptionDetails {
  @PrimaryColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  price: number;
  @Column()
  description: string;

  @ManyToOne(() => Option, (option) => option.optionDetails)
  option: Option;

  @ManyToMany(() => OrderDetails, (orderDetails) => orderDetails.optionsDetails)
  orderDetails: OrderDetails[];
}
