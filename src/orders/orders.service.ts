import { Order } from './order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto';
import { OrderDetailsService } from '../order_details/order-details.service';
import { AccountService } from '../auth/account.service';
import { NotAcceptableException, NotFoundException } from '@nestjs/common';
import { RestaurantsService } from '../restaurants/restaurants.service';

export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private orderDetailsService: OrderDetailsService,
    private accountService: AccountService,
    private restaurantService: RestaurantsService,
  ) {}

  async create(dto: CreateOrderDto, user: any) {
    if (!user.id) throw new NotFoundException('User not found');

    const account = await this.accountService.getCurrentUser(user.id);
    const restaurant = await this.restaurantService.findOne(dto.restaurantId);

    const orderDetailsPromises = dto.details.map((detail) => {
      return this.orderDetailsService.create(detail);
    });

    const orderDetailsList = await Promise.all(orderDetailsPromises);

    const order = this.orderRepository.create({
      orderDetails: orderDetailsList,
      restaurant,
      account,
    });

    return this.orderRepository.save(order);
  }

  async getAllOrders() {
    return this.orderRepository.find({
      relations: { orderDetails: true },
    });
  }

  async findOrdersSelf(user: any) {
    if (!user.id) throw new NotFoundException('User not found');
    return this.orderRepository.find({
      where: user.id,
      relations: { orderDetails: true },
    });
  }

  async cancelOrder(id: number, user: any) {
    if (!user.id) throw new NotFoundException('User not found');
    const order = await this.orderRepository.findOne({
      where: { id, account: user.id },
    });

    if (!order) {
      throw new NotFoundException('Order not found with this id');
    }

    if (!(order.status === 'pending' || order.status === 'canceled')) {
      throw new NotAcceptableException(
        'Order is currently completed or processing',
      );
    }

    order.status = 'canceled';

    return this.orderRepository.save(order);
  }
}
