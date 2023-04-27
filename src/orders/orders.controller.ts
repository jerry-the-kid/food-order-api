import { Body, Controller, Post } from '@nestjs/common';
import { Public } from '../common/decorator';
import { CreateOrderDto } from './dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @Post()
  @Public()
  create(@Body() dto: CreateOrderDto) {
    return this.orderService.create(dto);
  }
}
