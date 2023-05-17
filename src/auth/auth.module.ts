import { Module } from '@nestjs/common';
import { AccountsController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './account.entity';
import { AtStrategy, RtStrategy } from './strategies';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from '../mail/mail.module';
import { AccountService } from './account.service';
import { GeocodingService } from '../common/service/geocoding.service';

@Module({
  imports: [
    MailModule,
    TypeOrmModule.forFeature([Account]),
    JwtModule.register({}),
  ],
  controllers: [AccountsController],
  providers: [
    AuthService,
    AtStrategy,
    RtStrategy,
    AccountService,
    GeocodingService,
  ],
  exports: [AccountService, AuthService],
})
export class AuthModule {}
