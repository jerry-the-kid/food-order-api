import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './item.entity';
import { Repository } from 'typeorm';
import { SectionService } from '../sections/section.service';
import { AddOptionDto } from './dto/add-option.dto';
import { OptionsService } from '../options/options.service';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item) private repo: Repository<Item>,
    private readonly sectionService: SectionService,
    private readonly optionsService: OptionsService,
  ) {}

  async create(dto: CreateItemDto) {
    const section = await this.sectionService.findOne(dto.sectionId);
    if (!section) {
      throw new NotFoundException('Section not found');
    }

    const item = this.repo.create({
      ...dto,
      section,
    });

    return this.repo.save(item);
  }

  async addOption(id: number, dto: AddOptionDto) {
    const item = await this.repo.findOne({
      relations: { options: true },
      where: { id },
    });
    if (!item) {
      throw new NotFoundException('Item not found');
    }
    const option = await this.optionsService.create(
      dto.name,
      dto.limit,
      dto.optional,
    );

    item.options.push(option);
    return this.repo.save(item);
  }

  async findById(id: number) {
    return this.repo.findOne({
      relations: { options: { optionDetails: true } },
      where: { id },
    });
  }
}
