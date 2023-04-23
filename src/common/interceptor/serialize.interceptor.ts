import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { plainToInstance } from 'class-transformer';

interface ClassContructor {
  new (...args: any[]);
}

export function Serialize(dto: ClassContructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: ClassContructor) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<ClassContructor> | Promise<Observable<ClassContructor>> {
    return next.handle().pipe(
      map((data: ClassContructor) => {
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
