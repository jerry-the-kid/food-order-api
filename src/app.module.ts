import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { CuisinesModule } from './cuisines/cuisines.module';
import { Cuisine } from './cuisines/cuisine.entity';
import { OrdersModule } from './orders/orders.module';
import { SectionsModule } from './sections/sections.module';
import { ItemsModule } from './items/items.module';
import { Option } from './options/option.entity';
import { OptionsModule } from './options/options.module';
import { OptionDetailsModule } from './option_details/option_details.module';
import { OrderDetailsModule } from './order_details/order_details.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './auth/account.entity';
import { Item } from './items/item.entity';
import { OptionDetails } from './option_details/option-details.entity';
import { Order } from './orders/order.entity';
import { Restaurant } from './restaurants/restaurant.entity';
import { Section } from './sections/section.entity';
import { OrderDetails } from './order_details/order-details.entity';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './common/guard';
import { MailModule } from './mail/mail.module';
import { RolesGuard } from './common/guard/roles.guard';
import * as process from 'process';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: parseInt(configService.get('DB_PORT')),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_NAME'),
          entities: [
            Account,
            Cuisine,
            Item,
            Option,
            OptionDetails,
            Order,
            OrderDetails,
            Restaurant,
            Section,
          ],
          synchronize: configService.get('DB.SYNC') === 'true',
          ssl: {
            rejectUnauthorized: false, // This is necessary if you're using self-signed SSL certificates
          },
        };
      },
    }),
    AuthModule,
    RestaurantsModule,
    CuisinesModule,
    OrdersModule,
    SectionsModule,
    ItemsModule,
    OptionsModule,
    OptionDetailsModule,
    OrderDetailsModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
