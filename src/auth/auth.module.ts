import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtService } from './jwt.service'

@Module({
  providers: [
    JwtService,
    AuthService
  ],
  controllers: [
    AuthController
  ],
  exports: [
    JwtService
  ]
})
export class AuthModule {}