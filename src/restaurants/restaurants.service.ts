import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from './restaurant.entity';
import { Repository } from 'typeorm';
import { AccountService } from '../auth/account.service';
import {
  AddCuisineDto,
  AddOptionDto,
  AddSectionDto,
  CreateRestaurantDto,
} from './dto';
import * as slug from 'slug';
import { CuisinesService } from '../cuisines/cuisines.service';
import { SectionService } from '../sections/section.service';
import { OptionsService } from '../options/options.service';
import { OptionDetailsService } from '../option_details/option-details.service';
import { GeocodingService } from '../common/service/geocoding.service';
import { paginateRaw } from 'nestjs-typeorm-paginate';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant) private readonly repo: Repository<Restaurant>,
    private readonly accountService: AccountService,
    private readonly authService: AuthService,
    private readonly cuisinesService: CuisinesService,
    private sectionService: SectionService,
    private optionService: OptionsService,
    private optionsDetailService: OptionDetailsService,
    private geocodingService: GeocodingService,
  ) {}

  async create(dto: CreateRestaurantDto) {
    try {
      const firstCuisine = await this.cuisinesService.findOne(
        dto.firstCuisineId,
      );

      const account = await this.accountService.createRestaurantAccount({
        name: dto.ownerName,
        email: dto.email,
        phone: dto.phone,
        address: dto.address,
        password: dto.password,
      });

      const restaurant = this.repo.create({
        name: dto.name,
        address: dto.address,
        startWorkingTime: dto.startWorkingTime,
        endWorkingTime: dto.endWorkingTime,
        imgUrl: dto.imgUrl,
        slug: slug(dto.name + ' delivery'),
        account,
      });

      restaurant.cuisines = [firstCuisine];

      await this.repo.save(restaurant);
      return this.authService.getOtp(account.email);
    } catch (error) {
      if (error.code === '23505') {
        // 23505 is the Postgres error code for unique violation
        throw new ConflictException(
          `Email ${dto.email} is already registered.`,
        );
      }
      throw error;
    }
  }

  async findAllRestaurantQuery(
    limit: number,
    page: number,
    cusinesId?: number,
  ) {
    const query = await this.repo
      .createQueryBuilder('restaurant')
      .leftJoin('restaurant.account', 'account')
      .leftJoinAndSelect('restaurant.cuisines', 'cuisine')
      .select([
        'restaurant.id as id',
        'restaurant.name as name',
        'restaurant.imgUrl as imgUrl',
        'restaurant.slug as slug',
        'restaurant.rating as rating',
        'account.lat as lat',
        'account.lng as lng',
        'ARRAY_AGG(cuisine.name) as cuisines',
      ])
      .groupBy('restaurant.id, account.id');

    if (cusinesId) {
      query.where('cuisine.id = :cusinesId', { cusinesId });
    }

    const data = await paginateRaw(query, { limit, page });

    let restaurants: any = data.items;

    restaurants = restaurants.map((restaurant) => {
      return {
        ...restaurant,
        imgUrl: restaurant.imgurl,
        account: { lat: restaurant.lat, lng: restaurant.lng },
      };
    });

    return {
      restaurants,
      meta: data.meta,
    };
  }

  async findNearby(
    limit: number,
    page: number,
    location: { lat: number; lng: number },
  ) {
    const data = await this.findAllRestaurantQuery(limit, page);
    const restaurants = await this.filterRestaurants(
      data.restaurants,
      location,
    );
    return {
      restaurants,
      meta: data.meta,
    };
  }

  async findAllBySlug(
    slug: string,
    limit: number,
    page: number,
    location: { lat: number; lng: number },
  ) {
    const cuisines = await this.cuisinesService.findOneBySlug(slug);

    if (!cuisines) throw new NotFoundException();
    const data = await this.findAllRestaurantQuery(limit, page, cuisines.id);
    return {
      restaurants: await this.filterRestaurants(data.restaurants, location),
      meta: data.meta,
    };
  }

  async findOne(id: number) {
    const restaurant = await this.repo.findOne({
      relations: { account: true, cuisines: true, sections: { items: true } },
      where: { id: id },
    });

    if (!restaurant) {
      throw new NotFoundException('restaurant not found !!');
    }

    return restaurant;
  }

  async findOneBySlug(slug: string, location) {
    const restaurant = await this.repo.findOne({
      relations: {
        account: true,
        cuisines: true,
        sections: { items: { options: { optionDetails: true } } },
      },
      where: { slug: slug },
    });

    const { lat, lng } = restaurant.account;
    const { durationInMinutes, distanceInKilometers } =
      await this.getCalculatedTimeAndDistance(lat, lng, location);

    if (!restaurant) {
      throw new NotFoundException('restaurant not found !!');
    }

    return { ...restaurant, durationInMinutes, distanceInKilometers };
  }

  getSectionByRestaurant(id: number) {
    const restaurant = this.repo.findOne({
      where: { id: id },
      relations: { sections: true },
    });

    return restaurant;
  }

  async addCuisine(restaurantId: number, { id }: AddCuisineDto) {
    const cuisine = await this.cuisinesService.findOne(id);
    const restaurant = await this.repo.findOne({
      relations: { cuisines: true },
      where: { id: restaurantId },
    });

    if (!restaurant) throw new NotFoundException('restaurant not found !!');

    const findCuisine = restaurant.cuisines.find(
      (cuisine) => cuisine.id === id,
    );

    if (findCuisine) {
      throw new ConflictException('Cuisine already added');
    }

    restaurant.cuisines.push(cuisine);
    return this.repo.save(restaurant);
  }

  async addSection(restaurantId: number, dto: AddSectionDto) {
    const restaurant = await this.repo.findOne({
      relations: { sections: true },
      where: { id: restaurantId },
    });

    if (!restaurant) throw new NotFoundException('restaurant not found !!');

    const section = await this.sectionService.create(dto.name);
    restaurant.sections.push(section);
    return this.repo.save(restaurant);
  }

  async addOption(restaurantId: number, dto: AddOptionDto) {
    const restaurant = await this.repo.findOne({
      relations: { options: true },
      where: { id: restaurantId },
    });
    if (!restaurant) throw new NotFoundException('restaurant not found !!');
    const option = await this.optionService.create(
      dto.name,
      dto.limit,
      dto.optional,
    );

    const optionDetailsList =
      await this.optionsDetailService.addOptionDetailsList(
        dto.optionsDetailsList,
        option,
      );

    restaurant.options.push(option);
    await this.repo.save(restaurant);

    return { option: { ...option, optionDetails: optionDetailsList } };
  }

  async getCalculatedTimeAndDistance(
    lat,
    lng,
    location: { lat: number; lng: number },
  ) {
    return await this.geocodingService.getTravelTime(
      location.lat,
      location.lng,
      lat,
      lng,
    );
  }

  private async filterRestaurants(
    restaurants: Restaurant[],
    location: { lat: number; lng: number },
  ) {
    const calculatedRestaurants = await Promise.all(
      restaurants.map(async (restaurant) => {
        const { lat, lng } = restaurant.account;
        const { durationInMinutes, distanceInKilometers } =
          await this.getCalculatedTimeAndDistance(lat, lng, location);

        return { ...restaurant, durationInMinutes, distanceInKilometers };
      }),
    );

    // if (!filter) return calculatedRestaurants;

    return calculatedRestaurants;

    // return calculatedRestaurants.filter(
    //   (restaurant) => restaurant.distanceInKilometers < 10,
    // );
  }
}
