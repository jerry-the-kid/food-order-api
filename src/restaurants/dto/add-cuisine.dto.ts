import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddCuisineDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
