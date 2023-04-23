import { Cuisine } from '../../cuisines/cuisine.entity';
import { Expose, Transform } from 'class-transformer';

export class CuisinesDto {
  @Expose()
  id: number;
  @Expose()
  name: string;

  @Expose()
  @Transform(({ obj }) => obj.cuisines)
  cuisines: Cuisine[];
}
