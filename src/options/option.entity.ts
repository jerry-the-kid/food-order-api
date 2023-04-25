import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Item } from '../items/item.entity';
import { OptionDetails } from '../option_details/option-details.entity';

@Entity()
export class Option {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  limit: number;
  @Column({ default: false })
  optional: boolean;

  @ManyToOne(() => Item, (item) => item.options)
  item: Item;
  @OneToMany(() => OptionDetails, (optionDetails) => optionDetails.option)
  optionDetails: OptionDetails[];
}
