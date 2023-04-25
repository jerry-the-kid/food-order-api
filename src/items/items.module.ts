import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './item.entity';
import { SectionsModule } from '../sections/sections.module';
import { OptionsModule } from '../options/options.module';

@Module({
  imports: [OptionsModule, SectionsModule, TypeOrmModule.forFeature([Item])],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
