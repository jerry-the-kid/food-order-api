import { Module } from '@nestjs/common';
import { SectionService } from './section.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Section } from './section.entity';
import { SectionController } from './section.controller';

@Module({
  controllers: [SectionController],
  imports: [TypeOrmModule.forFeature([Section])],
  providers: [SectionService],
  exports: [SectionService],
})
export class SectionsModule {}
