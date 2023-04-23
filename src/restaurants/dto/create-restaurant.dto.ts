import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateRestaurantDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  startWorkingTime: string;

  @IsString()
  @IsNotEmpty()
  endWorkingTime: string;

  @IsString()
  @IsNotEmpty()
  ownerName: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Length(10, 10)
  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  imgUrl: string;

  @IsString()
  @IsNotEmpty()
  firstCuisineId: number;
}
