import { Expose, Transform } from 'class-transformer';

import { Section } from '../../sections/section.entity';

export class SectionsDto {
  @Expose()
  id: number;
  @Expose()
  name: string;

  @Expose()
  @Transform(({ obj }) => obj.sections)
  sections: Section[];
}
