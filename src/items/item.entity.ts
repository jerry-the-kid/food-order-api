import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Section } from '../sections/section.entity';
import { Option } from '../options/option.entity';

@Entity()
export class Item {
  @PrimaryColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  price: number;
  @Column()
  description: string;
  @Column()
  type: string;

  @ManyToOne(() => Section, (section) => section.items)
  @JoinColumn()
  section: Section;

  @OneToMany(() => Option, (option) => option.item)
  options: Option[];
}
