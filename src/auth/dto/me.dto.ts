import { Expose } from 'class-transformer';

export class MeDto {
  @Expose()
  id: number;
  @Expose()
  email: string;
  @Expose()
  role: string;
}
