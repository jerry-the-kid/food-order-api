import { Expose, Transform } from 'class-transformer';
import { OrderDetails } from '../../order_details/order-details.entity';

export class OrderDto {
  @Expose()
  id: number;
  @Expose()
  status: string;
  @Expose()
  totalPrice: number;
  @Expose()
  createdAt: Date;
  @Expose()
  @Transform(({ obj }) => obj.restaurant.id)
  restaurantId: number;

  @Expose()
  @Transform(({ obj }) => obj.account.id)
  accountId: number;

  @Expose()
  @Transform(({ obj }) => obj.orderDetails)
  orderDetails: OrderDetails[];
}
