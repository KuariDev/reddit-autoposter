import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import configuration from './configuration';
import { IJwtConfigService } from './config.interface'
import { JwtConfigService } from './config.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        JWT_ACCESS_SECRET: Joi.string().required(),
        JWT_REFRESH_SECRET: Joi.string().required(),
      }),
    }),
  ],
  providers: [
    {
      provide: IJwtConfigService,
      useClass: JwtConfigService,
    },
  ],
  exports: [
    {
      provide: IJwtConfigService,
      useClass: JwtConfigService,
    },
  ],
})
export class JwtConfigModule {}
