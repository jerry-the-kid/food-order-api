import { RestaurantDto } from './restaurant.dto';
import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

export class RestaurantListDto {
  @Expose()
  status: string;
  @Expose()
  results: number;
  @Expose()
  @Type(() => RestaurantDto)
  @ValidateNested()
  restaurants: RestaurantDto[];
}
