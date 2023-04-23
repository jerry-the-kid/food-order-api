import {
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
  price: number;
  @Column({ nullable: true })
  description: string;
  @Column()
  imgSrc: string;
  @Column()
  type: string;

  @ManyToOne(() => Section, (section) => section.items)
  @JoinColumn()
  section: Section;

  @OneToMany(() => Option, (option) => option.item)
  options: Option[];
}
