import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Section } from './section.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SectionService {
  constructor(
    @InjectRepository(Section) private readonly repo: Repository<Section>,
  ) {}

  async create(name: string) {
    const section = this.repo.create({ name });
    return this.repo.save(section);
  }

  async findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  getItemInSection(id: number) {
    const item = this.repo.findOne({
      where: { id },
      relations: { items: true },
    });

    return item;
  }
}
