import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Section } from '../sections/section.entity';
import { Option } from '../options/option.entity';

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

  @OneToMany(() => Option, (option) => option.item)
  options: Option[];

  @BeforeInsert()
  setPrice() {
    if (!this.price || this.price > this.actualPrice) {
      this.price = this.actualPrice;
    }
  }
}
