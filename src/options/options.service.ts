import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Option } from './option.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OptionsService {
  constructor(
    @InjectRepository(Option)
    private readonly repo: Repository<Option>,
  ) {}

  create(name: string, limit: number, optional = false) {
    return this.repo.save({ name, limit, optional });
  }

  async findOne(id: number) {
    const option = await this.repo.findOneBy({ id });
    if (!option) throw new NotFoundException('Option not found');

    return option;
  }
}
