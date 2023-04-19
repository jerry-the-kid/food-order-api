import { Column, Entity, ManyToMany, ManyToOne, PrimaryColumn } from 'typeorm';
import { Item } from '../items/item.entity';
import { OptionDetails } from '../option_details/option-details.entity';

@Entity()
export class Option {
  @PrimaryColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  type: boolean;

  @ManyToOne(() => Item, (item) => item.options)
  item: Item;
  @ManyToMany(() => OptionDetails, (optionDetails) => optionDetails.option)
  optionDetails: OptionDetails[];
}
