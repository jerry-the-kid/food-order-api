import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCuisineDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  imgSrc: string;
}
