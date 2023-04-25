import { Body, Controller, Post } from '@nestjs/common';
import { Public } from '../common/decorator';
import { CreateOptionDetailsDto } from './dto/create-option-details.dto';
import { OptionDetailsService } from './option-details.service';

@Controller('option-details')
export class OptionsDetailController {
  constructor(private optionDetailsService: OptionDetailsService) {}

  @Post()
  @Public()
  create(@Body() dto: CreateOptionDetailsDto) {
    return this.optionDetailsService.create(dto);
  }
}
