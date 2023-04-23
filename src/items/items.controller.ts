import { Body, Controller, Post } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Public } from '../common/decorator';
import { CreateItemDto } from './dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  @Public()
  create(@Body() dto: CreateItemDto) {
    return this.itemsService.create(dto);
  }
}
