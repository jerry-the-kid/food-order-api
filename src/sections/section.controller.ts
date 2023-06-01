import { Controller, Get, Param } from '@nestjs/common';
import { SectionService } from './section.service';
import { Public } from '../common/decorator';

@Controller('sections')
export class SectionController {
  constructor(private sectionService: SectionService) {}

  @Public()
  @Get('/:id/items')
  getItemsBySection(@Param('id') id: string) {
    console.log(id);
    return this.sectionService.getItemInSection(+id);
  }
}
