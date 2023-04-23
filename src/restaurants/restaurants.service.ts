import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from './restaurant.entity';
import { Repository } from 'typeorm';
import { AccountService } from '../auth/account.service';
import { AddCuisineDto, AddSectionDto, CreateRestaurantDto } from './dto';
import { NotFoundError } from 'rxjs';
import * as slug from 'slug';
import { CuisinesService } from '../cuisines/cuisines.service';
import { SectionService } from '../sections/section.service';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant) private readonly repo: Repository<Restaurant>,
    private readonly accountService: AccountService,
    private readonly cuisinesService: CuisinesService,
    private sectionService: SectionService,
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

      return this.repo.save(restaurant);
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

  async findOne(id: number) {
    const restaurant = await this.repo.findOne({
      relations: { account: true, cuisines: true, sections: { items: true } },
      where: { id: id },
    });

    if (!restaurant) {
      throw new NotFoundError('restaurant not found !!');
    }

    return restaurant;
  }

  async addCuisine(restaurantId: number, { id }: AddCuisineDto) {
    const cuisine = await this.cuisinesService.findOne(id);
    const restaurant = await this.repo.findOne({
      relations: { cuisines: true },
      where: { id: restaurantId },
    });

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

    const section = await this.sectionService.create(dto.name);
    restaurant.sections.push(section);
    return this.repo.save(restaurant);
  }
}
