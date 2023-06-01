import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { Public } from '../common/decorator';
import { CreateItemDto, UpdateItemDto } from './dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  @Public()
  create(@Body() dto: CreateItemDto) {
    return this.itemsService.create(dto);
  }

  @Patch('/:id')
  @Public()
  update(@Param('id') id: string, dto: UpdateItemDto) {
    return this.itemsService.update(+id, dto);
  }

  @Delete('/:id')
  @Public()
  delete(@Param('id') id: string) {
    return this.itemsService.delete(+id);
  }

  @Patch('/:id/options/:optionId')
  @Public()
  addOption(@Param('id') id: string, @Param('optionId') optionId: string) {
    return this.itemsService.addOption(parseInt(id), parseInt(optionId));
  }

  @Get('/:id')
  @Public()
  getOption(@Param('id') id: string) {
    return this.itemsService.findById(parseInt(id));
  }
}
