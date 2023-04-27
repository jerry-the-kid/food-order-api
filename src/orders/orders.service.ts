import { Order } from './order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemsService } from '../items/items.service';
import { CreateOrderDto } from './dto';

export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private itemsService: ItemsService,
  ) {}

  async create(dto: CreateOrderDto) {
    const item = await this.itemsService.findById(dto.details[0].itemId);
    console.log(item);
    return dto;
  }
}
