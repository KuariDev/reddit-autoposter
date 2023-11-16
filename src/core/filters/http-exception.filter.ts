import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const errors = exception.message

    response
      .status(status)
      .json({
        info: {
          // @ts-ignore
          errors: exception.getResponse().message,
          status_code: status || 500,
        },
        method: request.method,
        path: request.url,
        timestamp: new Date().toISOString(),
      });
  }
}