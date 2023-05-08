import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderDetailDto {
  @IsNotEmpty()
  @IsNumber()
  itemId: number;
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
  message: string;
  optionsDetailsIds: number[];
}
