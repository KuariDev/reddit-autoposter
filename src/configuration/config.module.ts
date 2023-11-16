import { Global, Module } from '@nestjs/common'
import { AppConfigModule } from './app/config.module'
import { JwtConfigModule } from './jwt/config.module'

@Global()
@Module({
  imports: [
    AppConfigModule,
    JwtConfigModule,
  ],
  exports: [
    AppConfigModule,
    JwtConfigModule,
  ]
})
export class ConfigModule {}