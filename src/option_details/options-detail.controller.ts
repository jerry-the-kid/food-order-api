import { Controller } from '@nestjs/common';
import { OptionDetailsService } from './option-details.service';

@Controller('option-details')
export class OptionsDetailController {
  constructor(private optionDetailsService: OptionDetailsService) {}
}
