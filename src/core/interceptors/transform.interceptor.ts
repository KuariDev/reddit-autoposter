import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadGatewayException, HttpException,
} from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';


export interface Response<T> {
  data: T;
  info: {
    errors?: any;
    status_code: number;
  };
  timestamp: string;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
/*      catchError((err) => {
        console.log(err)
        return throwError(() =>
          new HttpException({
            info: {
              errors: err.response?.message,
              status_code: err.status || 500,
            },
            method: context.switchToHttp().getRequest().method,
            path: context.switchToHttp().getRequest().path,
            timestamp: new Date().toISOString(),
          }, err.status || 500)
        );
      }),*/
      map((data) => ({
        data,
        info: {
          status_code: context.switchToHttp().getResponse()
            .statusCode,
        },
        method: context.switchToHttp().getRequest().method,
        path: context.switchToHttp().getRequest().path,
        timestamp: new Date().toISOString(),
      }))
    );
  }
}
