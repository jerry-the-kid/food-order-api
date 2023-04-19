import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Account } from '../auth/account.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendOtpConfirmation(user: Account) {
    console.log(user);
    await this.mailerService.sendMail({
      to: user.email,
      from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './otp',
      context: {
        code: user.otp,
      },
    });
  }
}
