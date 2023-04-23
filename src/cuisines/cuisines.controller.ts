import { Body, Controller, Post } from '@nestjs/common';
import { CuisinesService } from './cuisines.service';
import { CreateCuisineDto } from './dto/create-cuisine.dto';
import { Public } from '../common/decorator';

@Controller('cuisines')
export class CuisinesController {
  constructor(private readonly cuisinesService: CuisinesService) {}

  @Post()
  @Public()
  create(@Body() createCuisineDto: CreateCuisineDto) {
    return this.cuisinesService.create(createCuisineDto);
  }
}
