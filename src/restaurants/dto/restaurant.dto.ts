import { Expose, Transform } from 'class-transformer';
import { Cuisine } from '../../cuisines/cuisine.entity';
import { Section } from '../../sections/section.entity';

export class RestaurantDto {
  @Expose()
  id: number;
  @Expose()
  name: string;
  @Expose()
  rating: number;
  @Expose()
  imgUrl: string;
  @Expose()
  startWorkingTime: string;
  @Expose()
  endWorkingTime: string;
  @Expose()
  address: string;
  @Expose()
  slug: string;

  @Expose()
  durationInMinutes: string;
  @Expose()
  distanceInKilometers: string;

  @Expose()
  @Transform(({ obj }) => obj.account.id)
  account_id: number;

  @Expose()
  @Transform(({ obj }) => obj.cuisines)
  cuisines: Cuisine[];

  @Expose()
  @Transform(({ obj }) => obj.sections)
  sections: Section[];
}
