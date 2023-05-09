import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { CreateOrderDto } from './dto';
import { OrdersService } from './orders.service';
import { Request } from 'express';
import { Serialize } from '../common/interceptor';
import { OrderDto } from './dto/order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @Post()
  @Serialize(OrderDto)
  create(@Body() dto: CreateOrderDto, @Req() req: Request) {
    return this.orderService.create(dto, req.user);
  }

  @Get()
  getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @Get('/me')
  findOrdersSelf(@Req() req: Request) {
    return this.orderService.findOrdersSelf(req.user);
  }

  @Patch('/:id/cancel')
  cancelOrder(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    return this.orderService.cancelOrder(id, req.user);
  }
}
