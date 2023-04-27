import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OptionDetails } from './option-details.entity';
import { Repository } from 'typeorm';
import { Option } from '../options/option.entity';
import { CreateOptionDetailsDto } from './dto';

@Injectable()
export class OptionDetailsService {
  constructor(
    @InjectRepository(OptionDetails)
    private readonly repo: Repository<OptionDetails>,
  ) {}

  async addOptionDetailsList(list: CreateOptionDetailsDto[], option: Option) {
    const optionDetailsList = list.map((item) => {
      return { ...item, option };
    });

    const queryResult = await this.repo
      .createQueryBuilder()
      .insert()
      .values(optionDetailsList)
      .returning('*')
      .execute();

    return queryResult.raw;
  }

  async findByIds(ids: number[]) {
    return await this.repo.createQueryBuilder().whereInIds(ids).getMany();
  }
}
