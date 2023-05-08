import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

class RestaurantElementDto {
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
}

class MetaDto {
  @Expose()
  itemsPerPage: number;
  @Expose()
  totalPages: number;
  @Expose()
  currentPage: number;
}

export class RestaurantListDto {
  @Expose()
  @Type(() => MetaDto)
  @ValidateNested()
  readonly meta: MetaDto;

  @Expose()
  @Type(() => RestaurantElementDto)
  @ValidateNested({ each: true })
  readonly restaurants: RestaurantElementDto[];
}
