import { Module } from '@nestjs/common';
import { OptionsDetailController } from './options-detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OptionDetails } from './option-details.entity';
import { OptionDetailsService } from './option-details.service';
import { OptionsModule } from '../options/options.module';

@Module({
  imports: [OptionsModule, TypeOrmModule.forFeature([OptionDetails])],
  controllers: [OptionsDetailController],
  providers: [OptionDetailsService],
})
export class OptionDetailsModule {}
