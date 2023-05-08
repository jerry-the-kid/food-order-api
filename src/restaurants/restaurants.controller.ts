import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { Public } from '../common/decorator';
import {
  AddCuisineDto,
  AddOptionDto,
  AddSectionDto,
  CreateRestaurantDto,
  CuisinesDto,
  RestaurantDto,
  RestaurantListDto,
  SectionsDto,
} from './dto';
import { RestaurantsService } from './restaurants.service';
import { Serialize } from '../common/interceptor';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private restaurantService: RestaurantsService) {}

  @Post()
  @Public()
  @Serialize(RestaurantDto)
  createRestaurant(@Body() dto: CreateRestaurantDto) {
    return this.restaurantService.create(dto);
  }

  // @Get()
  // @Public()
  // @Serialize(RestaurantListDto)
  // async getRestaurants() {
  //   return this.restaurantService.findAll();
  // }

  @Get('/nearby')
  @Public()
  @Serialize(RestaurantListDto)
  async getNearbyRestaurants(
    @Query('limit', new DefaultValuePipe(100), ParseIntPipe) limit = 100,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
  ) {
    limit = limit > 100 ? 100 : limit;
    const { meta, restaurants } = await this.restaurantService.findNearby(
      limit,
      page,
    );

    return {
      meta: meta,
      restaurants: restaurants.sort(
        (a, b) => a.distanceInKilometers - b.distanceInKilometers,
      ),
    };
  }

  @Get('/top-rated')
  @Public()
  @Serialize(RestaurantListDto)
  async getTopRatedRestaurants(
    @Query('limit', new DefaultValuePipe(100), ParseIntPipe) limit = 100,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
  ) {
    limit = limit > 100 ? 100 : limit;
    const { meta, restaurants } = await this.restaurantService.findNearby(
      limit,
      page,
    );

    return {
      meta: meta,
      restaurants: restaurants.sort((a, b) => b.rating - a.rating),
    };
  }

  @Get('/:id')
  @Public()
  @Serialize(RestaurantDto)
  getRestaurant(@Param('id') id: string) {
    return this.restaurantService.findOne(parseInt(id));
  }

  @Get('/slug/:slug')
  @Public()
  @Serialize(RestaurantDto)
  getRestaurantsBySlug(@Param('slug') slug: string) {
    return this.restaurantService.findOneBySlug(slug);
  }

  @Get('/cuisines/:slug')
  @Public()
  @Serialize(RestaurantListDto)
  async getRestaurantsByCuisineSlug(
    @Param('slug') slug: string,
    @Query('limit', new DefaultValuePipe(100), ParseIntPipe) limit = 100,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
  ) {
    limit = limit > 100 ? 100 : limit;
    return await this.restaurantService.findAllBySlug(slug, limit, page);
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
