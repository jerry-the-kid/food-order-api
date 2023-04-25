import { Module } from '@nestjs/common';
import { OptionsDetailController } from './options-detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OptionDetails } from './option-details.entity';
import { OptionDetailsService } from './option-details.service';

@Module({
  imports: [TypeOrmModule.forFeature([OptionDetails])],
  controllers: [OptionsDetailController],
  providers: [OptionDetailsService],
  exports: [OptionDetailsService],
})
export class OptionDetailsModule {}
