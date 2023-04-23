import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './item.entity';
import { Repository } from 'typeorm';
import { SectionService } from '../sections/section.service';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item) private repo: Repository<Item>,
    private readonly sectionService: SectionService,
  ) {}

  async create(dto: CreateItemDto) {
    const section = await this.sectionService.findOne(dto.sectionId);
    const item = this.repo.create({
      ...dto,
      section,
    });

    return this.repo.save(item);
  }
}
