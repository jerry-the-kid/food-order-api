import { IsNotEmpty, IsString } from 'class-validator';

export class EmailPwAuthDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
