import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { CuisinesModule } from './cuisines/cuisines.module';
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
import { Cuisines } from './cuisines/cuisines.entity';
import { Item } from './items/item.entity';
import { OptionDetails } from './option_details/option-details.entity';
import { Order } from './orders/order.entity';
import { Restaurant } from './restaurants/restaurant.entity';
import { Section } from './sections/section.entity';
import { OrderDetails } from './order_details/order-details.entity';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './common/guard';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'config.env',
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('DB.HOST'),
          port: parseInt(configService.get('DB.PORT')),
          username: configService.get('DB.USERNAME'),
          password: configService.get('DB.PASSWORD'),
          database: configService.get('DB.NAME'),
          entities: [
            Account,
            Cuisines,
            Item,
            Option,
            OptionDetails,
            Order,
            OrderDetails,
            Restaurant,
            Section,
          ],
          synchronize: true,
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
  ],
})
export class AppModule {}
