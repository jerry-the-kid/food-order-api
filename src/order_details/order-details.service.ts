import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { OrderDetails } from './order-details.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OptionDetailsService } from '../option_details/option-details.service';
import { ItemsService } from '../items/items.service';
import { CreateOrderDetailDto } from './dto';

@Injectable()
export class OrderDetailsService {
  constructor(
    @InjectRepository(OrderDetails)
    private readonly orderRepository: Repository<OrderDetails>,
    private itemsService: ItemsService,
    private optionsDetailsService: OptionDetailsService,
  ) {}

  async create(createOrderDetailsDto: CreateOrderDetailDto) {
    const item = await this.itemsService.findByIdRaw(
      createOrderDetailsDto.itemId,
    );
    const optionsDetails = await this.optionsDetailsService.findByIds(
      createOrderDetailsDto.optionsDetailsIds,
    );

    const totalPrice =
      (item.price + optionsDetails.reduce((acc, cur) => acc + cur.price, 0)) *
      createOrderDetailsDto.quantity;

    const orderDetail = this.orderRepository.create({
      quantity: createOrderDetailsDto.quantity,
      message: createOrderDetailsDto.message,
      totalPrice,
      item,
      optionsDetails: optionsDetails,
    });
    return this.orderRepository.save(orderDetail);
  }
}
