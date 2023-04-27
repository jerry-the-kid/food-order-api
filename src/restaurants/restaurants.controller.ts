import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

@Controller('restaurants')
export class RestaurantsController {
  constructor(private restaurantService: RestaurantsService) {}

  @Post()
  @Public()
  @Serialize(RestaurantDto)
  createRestaurant(@Body() dto: CreateRestaurantDto) {
    return this.restaurantService.create(dto);
  }

  @Get('/:id')
  @Public()
  @Serialize(RestaurantDto)
  getRestaurant(@Param('id') id: string) {
    return this.restaurantService.findOne(parseInt(id));
  }

  @Get('/cuisines/:slug')
  @Public()
  @Serialize(RestaurantDto)
  getRestaurantsBySlug(@Param('slug') slug: string) {
    return this.restaurantService.findAllBySlug(slug);
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
