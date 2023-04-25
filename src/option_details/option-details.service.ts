import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OptionDetails } from './option-details.entity';
import { Repository } from 'typeorm';
import { CreateOptionDetailsDto } from './dto';
import { OptionsService } from '../options/options.service';

@Injectable()
export class OptionDetailsService {
  constructor(
    @InjectRepository(OptionDetails)
    private readonly repo: Repository<OptionDetails>,
    private readonly optionsService: OptionsService,
  ) {}

  async create(dto: CreateOptionDetailsDto) {
    const option = await this.optionsService.findOne(dto.optionId);
    const optionDetails = this.repo.create({
      ...dto,
      option,
    });

    return this.repo.save(optionDetails);
  }
}
