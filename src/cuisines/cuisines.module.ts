import { Module } from '@nestjs/common';
import { CuisinesService } from './cuisines.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cuisine } from './cuisine.entity';
import { CuisinesController } from './cuisines.controller';

@Module({
  controllers: [CuisinesController],
  imports: [TypeOrmModule.forFeature([Cuisine])],
  providers: [CuisinesService],
  exports: [CuisinesService],
})
export class CuisinesModule {}
