import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Account } from '../auth/account.entity';
import { getOtpTemplate } from './templates/otp';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendOtpConfirmation(user: Account) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to FoodOrder App! Confirm your Email',
      html: getOtpTemplate(user.otp),
      context: {
        code: user.otp,
      },
    });
  }
}
