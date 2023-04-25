import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateOptionDetailsDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  price: number;

  description: string;
  //
  // @IsNumber()
  // @IsNotEmpty()
  // optionId: number;
}
