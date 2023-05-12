import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

export class LocationInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const lat = request.cookies.lat;
    const lng = request.cookies.lng;
    if (!lat || !lng) {
      throw new BadRequestException(
        'Latitude or longitude not found in cookie',
      );
    }
    request.location = {
      lat,
      lng,
    };
    return next.handle();
  }
}
