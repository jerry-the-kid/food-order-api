import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddOptionDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  limit: number;

  optional: boolean;
}
