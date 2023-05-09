import { Expose, Transform, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

class OptionDetailsDto {
  @Expose()
  id: number;
  @Expose()
  name: string;
}

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

  @Expose()
  @Type(() => OptionDetailsDto)
  @ValidateNested()
  optionsDetails: OptionDetailsDto[];
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
  @Transform(({ obj }) => obj.restaurant.id)
  restaurantId: number;

  @Expose()
  @Transform(({ obj }) => obj.restaurant.name)
  restaurantName: string;

  @Expose()
  @Transform(({ obj }) => obj.restaurant.slug)
  restaurantSlug: string;

  @Expose()
  @Type(() => OrderDetailsDto)
  @ValidateNested()
  orderDetails: OrderDetailsDto[];
}
