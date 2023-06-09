import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1000)
  actualPrice: number;

  price: number;

  description: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsNumber()
  @IsNotEmpty()
  sectionId: number;

  imgSrc: string;
}
