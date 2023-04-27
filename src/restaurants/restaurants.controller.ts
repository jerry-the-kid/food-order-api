import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Public } from '../common/decorator';
import {
  AddCuisineDto,
  AddOptionDto,
  AddSectionDto,
  CreateRestaurantDto,
  CuisinesDto,
  RestaurantDto,
  SectionsDto,
} from './dto';
import { RestaurantsService } from './restaurants.service';
import { Serialize } from '../common/interceptor';
import { RestaurantListDto } from './dto/restaurant-list.dto';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private restaurantService: RestaurantsService) {}

  @Post()
  @Public()
  @Serialize(RestaurantDto)
  createRestaurant(@Body() dto: CreateRestaurantDto) {
    return this.restaurantService.create(dto);
  }

  @Get()
  @Public()
  @Serialize(RestaurantListDto)
  async getRestaurants() {
    const restaurants = await this.restaurantService.findAll();
    return {
      status: 'success',
      results: restaurants.length,
      restaurants,
    };
  }

  @Get('/nearby')
  @Public()
  @Serialize(RestaurantListDto)
  async getNearbyRestaurants(@Query('limit') limit: string) {
    const restaurants = await this.restaurantService.findNearby();

    let sortedRestaurants = restaurants.sort(
      (a, b) => a.distanceInKilometers - b.distanceInKilometers,
    );

    if (limit) {
      sortedRestaurants = sortedRestaurants.slice(0, parseInt(limit));
    }

    return {
      status: 'success',
      results: sortedRestaurants.length,
      restaurants: sortedRestaurants,
    };
  }

  @Get('/top-rated')
  @Public()
  @Serialize(RestaurantListDto)
  async getTopRatedRestaurants(@Query('limit') limit: string) {
    const restaurants = await this.restaurantService.findNearby();
    let sortedRestaurants = restaurants.sort((a, b) => b.rating - a.rating);

    if (limit) {
      sortedRestaurants = sortedRestaurants.slice(0, parseInt(limit));
    }

    return {
      status: 'success',
      results: sortedRestaurants.length,
      restaurants: sortedRestaurants,
    };
  }

  @Get('/:id')
  @Public()
  @Serialize(RestaurantDto)
  getRestaurant(@Param('id') id: string) {
    return this.restaurantService.findOne(parseInt(id));
  }

  @Get('/cuisines/:slug')
  @Public()
  @Serialize(RestaurantListDto)
  async getRestaurantsBySlug(
    @Param('slug') slug: string,
    @Query('limit') limit: string,
  ) {
    let restaurants = await this.restaurantService.findAllBySlug(slug);
    if (limit) {
      restaurants = restaurants.slice(0, parseInt(limit));
    }

    return {
      status: 'success',
      results: restaurants.length,
      restaurants,
    };
  }

  @Post('/:id/cuisines')
  @Public()
  @Serialize(CuisinesDto)
  addCuisine(@Param('id') id: string, @Body() dto: AddCuisineDto) {
    return this.restaurantService.addCuisine(parseInt(id), dto);
  }

  @Post('/:id/sections')
  @Public()
  @Serialize(SectionsDto)
  addSection(@Param('id') id: string, @Body() dto: AddSectionDto) {
    return this.restaurantService.addSection(parseInt(id), dto);
  }

  @Post('/:id/options')
  @Public()
  addOption(@Param('id') id: string, @Body() dto: AddOptionDto) {
    return this.restaurantService.addOption(parseInt(id), dto);
  }
}
