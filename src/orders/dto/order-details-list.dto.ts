import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

class ItemDto {
  @Expose()
  name: string;
  @Expose()
  imgSrc: string;
}

class OrderDetailsDto {
  @Expose()
  id: number;
  @Expose()
  quantity: number;
  @Expose()
  message: string;
  @Expose()
  totalPrice: number;
  @Expose()
  @Type(() => ItemDto)
  @ValidateNested()
  item: ItemDto;
}

export class OrderDetailsListDto {
  @Expose()
  id: number;
  @Expose()
  status: number;
  @Expose()
  totalPrice: number;
  @Expose()
  createdAt: Date;
  @Expose()
  updatedAt: Date;

  @Expose()
  @Type(() => OrderDetailsDto)
  @ValidateNested()
  orderDetails: OrderDetailsDto[];
}
