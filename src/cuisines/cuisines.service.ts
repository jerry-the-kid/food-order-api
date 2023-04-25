import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cuisine } from './cuisine.entity';
import { Repository } from 'typeorm';
import { CreateCuisineDto } from './dto/create-cuisine.dto';
import * as slug from 'slug';

@Injectable()
export class CuisinesService {
  constructor(
    @InjectRepository(Cuisine)
    private readonly repo: Repository<Cuisine>,
  ) {}

  create(dto: CreateCuisineDto) {
    const cuisine = this.repo.create({
      name: dto.name,
      slug: slug(dto.name + ' delivery'),
    });

    return this.repo.save(cuisine);
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }
}