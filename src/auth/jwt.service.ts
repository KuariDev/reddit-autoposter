import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { IAccessTokenPayload } from './interfaces/accessToken.interface'
import * as jwt from 'jsonwebtoken'
import { IRefreshTokenPayload } from './interfaces/refreshToken.interface'
import { IJwtConfigService } from '../configuration/jwt/config.interface'

@Injectable()
export class JwtService {
  constructor(
    @Inject(IJwtConfigService) private readonly jwtConfigService: IJwtConfigService
  ) {}

  getNewPair(payload: IAccessTokenPayload) {

    const access = jwt.sign(payload, this.jwtConfigService.access, {
      expiresIn: String(this.jwtConfigService.accessTTL)
    })
    const refresh = jwt.sign({ date: new Date(), id: payload.id } as IRefreshTokenPayload, this.jwtConfigService.refresh, {
      expiresIn: String(this.jwtConfigService.refreshTTL)
    })
    return { access, refresh }
  }

  accessVerify(token: string): IAccessTokenPayload {
    try {
      const payload = jwt.verify(token, this.jwtConfigService.access, {
        ignoreExpiration: false,
        maxAge: String(this.jwtConfigService.accessTTL)
      }) as IAccessTokenPayload
      return payload
    } catch (e) {
      throw new UnauthorizedException('Wrong or expired access token')
    }
  }

  refreshVerify(token: string): IRefreshTokenPayload {
    try {
      const payload = jwt.verify(token, this.jwtConfigService.refresh, {
        ignoreExpiration: false,
        maxAge: String(this.jwtConfigService.refreshTTL)
      }) as IRefreshTokenPayload
      return payload
    } catch (e) {
      throw new UnauthorizedException('Wrong or expired refresh token')
    }
  }
}