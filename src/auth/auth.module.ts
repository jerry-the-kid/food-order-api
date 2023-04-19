import { Module } from '@nestjs/common';
import { AccountsController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './account.entity';
import { AtStrategy, RtStrategy } from './strategies';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    MailModule,
    TypeOrmModule.forFeature([Account]),
    JwtModule.register({}),
  ],
  controllers: [AccountsController],
  providers: [AuthService, AtStrategy, RtStrategy],
})
export class AuthModule {}
