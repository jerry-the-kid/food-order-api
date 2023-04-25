import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Public } from '../common/decorator';
import { CreateItemDto } from './dto';
import { AddOptionDto } from './dto/add-option.dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  @Public()
  create(@Body() dto: CreateItemDto) {
    return this.itemsService.create(dto);
  }

  @Post('/:id/option')
  @Public()
  addOption(@Param('id') id: string, @Body() dto: AddOptionDto) {
    return this.itemsService.addOption(parseInt(id), dto);
  }

  @Get('/:id')
  @Public()
  getOption(@Param('id') id: string) {
    return this.itemsService.findById(parseInt(id));
  }
}
