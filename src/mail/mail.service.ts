import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { getOtpTemplate } from './templates/otp';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendOtpConfirmation(user) {
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
