import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderDetailsDto {
  @IsNotEmpty()
  @IsNumber()
  itemId: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  message: string;

  optionsDetailsIds: number[];
}

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  restaurantId: number;

  @Type(() => CreateOrderDetailsDto)
  @ValidateNested()
  details: CreateOrderDetailsDto[];
}
