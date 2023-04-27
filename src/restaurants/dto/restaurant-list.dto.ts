import { Expose } from 'class-transformer';

export class RestaurantListDto {
  @Expose()
  id: number;
  @Expose()
  name: string;
  @Expose()
  rating: number;
  @Expose()
  imgUrl: string;
  @Expose()
  slug: string;

  @Expose()
  durationInMinutes: string;
  @Expose()
  distanceInKilometers: string;

  @Expose()
  cuisines: string[];

  // @Expose()
  // @Transform(({ obj }) => obj.account.id)
  // account_id: number;
}
