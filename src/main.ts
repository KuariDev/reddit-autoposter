import {ValidationPipe} from "@nestjs/common";
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression'
import * as cookieParser from 'cookie-parser'
import Helmet from 'helmet'
import { HttpExceptionFilter } from './core/filters/http-exception.filter'
import { TransformInterceptor } from './core/interceptors/transform.interceptor'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true
  });

  app.setGlobalPrefix('api')

  app.use(Helmet())
  app.use(cookieParser())
  app.use(compression())

  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new TransformInterceptor())
  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  const configService = app.get(ConfigService);
  await app.listen(configService.get('app.port'),'127.0.0.1', () => {
    console.log('listening on port ' + configService.get('app.port'))
  });
}
bootstrap();
