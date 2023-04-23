import { Module } from '@nestjs/common';
import { RestaurantsController } from './restaurants.controller';
import { GeocodingService } from '../common/service/geocoding.service';
import { RestaurantsService } from './restaurants.service';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './restaurant.entity';
import { CuisinesModule } from '../cuisines/cuisines.module';
import { SectionsModule } from '../sections/sections.module';

@Module({
  imports: [
    AuthModule,
    CuisinesModule,
    SectionsModule,
    TypeOrmModule.forFeature([Restaurant]),
  ],
  controllers: [RestaurantsController],
  providers: [GeocodingService, RestaurantsService],
})
export class RestaurantsModule {}
