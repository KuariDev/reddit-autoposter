import { Module } from '@nestjs/common';
import { ConfigModule } from './configuration/config.module'
import { ProvidersModule } from './providers/providers.module'
import { UserModule } from './models/user/user.module'
import { AccountModule } from './models/account/account.module'
import { PostModule } from './models/post/post.module'
import { ScheduleModule } from '@nestjs/schedule'
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ScheduleModule.forRoot(),
    ConfigModule,
    ProvidersModule,

    UserModule,
    AccountModule,
    PostModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
