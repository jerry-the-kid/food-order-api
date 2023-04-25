import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Section } from '../sections/section.entity';
import { Option } from '../options/option.entity';
import { OrderDetails } from '../order_details/order-details.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  actualPrice: number;
  @Column()
  price: number;
  @Column({ nullable: true })
  description: string;
  @Column({ nullable: true })
  imgSrc: string;
  @Column()
  type: string;
  @Column({ default: false })
  disable: boolean;

  @ManyToOne(() => Section, (section) => section.items)
  @JoinColumn()
  section: Section;

  @ManyToMany(() => Option, (option) => option.items)
  options: Option[];

  @OneToMany(() => OrderDetails, (orderDetails) => orderDetails.item)
  orderDetails: OrderDetails[];

  @BeforeInsert()
  setPrice() {
    if (!this.price || this.price > this.actualPrice) {
      this.price = this.actualPrice;
    }
  }
}
