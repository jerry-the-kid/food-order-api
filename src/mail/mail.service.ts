import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Account } from '../auth/account.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendOtpConfirmation(user: Account) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to FoodOrder App! Confirm your Email',
      template: './otp',
      context: {
        code: user.otp,
      },
    });
  }
}
