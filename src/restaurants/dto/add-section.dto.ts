import { IsNotEmpty, IsString } from 'class-validator';

export class AddSectionDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
