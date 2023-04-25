import { Module } from '@nestjs/common';
import { OrderDetailsService } from './order-details.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetails } from './order-details.entity';
import { OrderDetailsController } from './order-details.controller';

@Module({
  controllers: [OrderDetailsController],
  imports: [TypeOrmModule.forFeature([OrderDetails])],
  providers: [OrderDetailsService],
})
export class OrderDetailsModule {}
