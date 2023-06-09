import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          transport: {
            host: configService.get('MAIL_HOST'),
            port: parseInt(configService.get('MAIL_PORT')),
            auth: {
              user: configService.get('MAIL_USERNAME'),
              pass: configService.get('MAIL_PASSWORD'),
            },
          },
          defaults: {
            from: configService.get('MAIL_FROM'),
          },
          template: {
            dir: join(__dirname, 'templates'),
            adapter: new PugAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
      inject: [ConfigService], // add Logger to inject
    }),
    ConfigModule, // add ConfigModule to imports
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
