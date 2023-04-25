import { Expose, Transform } from 'class-transformer';

export class OptionsDto {
  @Expose()
  id: number;
  @Expose()
  name: string;

  @Expose()
  @Transform(({ obj }) => obj.options)
  options: any;
}
