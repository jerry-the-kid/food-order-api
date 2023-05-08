import { Module } from '@nestjs/common';
import { OrderDetailsService } from './order-details.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetails } from './order-details.entity';
import { OrderDetailsController } from './order-details.controller';
import { OptionDetailsModule } from '../option_details/option_details.module';
import { ItemsModule } from '../items/items.module';

@Module({
  controllers: [OrderDetailsController],
  imports: [
    TypeOrmModule.forFeature([OrderDetails]),
    OptionDetailsModule,
    ItemsModule,
  ],
  providers: [OrderDetailsService],
  exports: [OrderDetailsService],
})
export class OrderDetailsModule {}
