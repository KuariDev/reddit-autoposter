import { BadRequestException, ForbiddenException, Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from './jwt.service'
import { LoginDto } from './dto/login.dto'
import { RefreshDto } from './dto/refresh.dto'
import { IAccessTokenPayload } from './interfaces/accessToken.interface'
import { IRefreshTokenPayload } from './interfaces/refreshToken.interface'
import { User } from '@prisma/client'
import {PrismaService} from "../providers/database/prisma/provider.service";
import { IAppConfigService } from '../configuration/app/config.interface'

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    @Inject(IAppConfigService) private readonly appConfigService: IAppConfigService
  ) {}


  async login(loginDto: LoginDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        password: loginDto.password
      }
    })

    if (!user) {
      throw new BadRequestException('Invalid password')
    }

    return this._getNewPairAndUpdateUser(user)
  }

  async refresh(refreshDto: RefreshDto) {
    const payload: IRefreshTokenPayload = this.jwtService.refreshVerify(refreshDto.refreshToken)
    const user = await this.prismaService.user.findUnique({
      where: {
        id: payload.id
      }
    })
    if (refreshDto.refreshToken != user!.refreshToken) {
      throw new UnauthorizedException('Wrong or expired refresh token')
    }

    const result = await this._getNewPairAndUpdateUser(user!)
    return result.pair
  }

  private async _getNewPairAndUpdateUser(user: User) {
    const pair = this.jwtService.getNewPair({
      id: user.id,
      role: user.role,
    })
    await this.prismaService.user.update({
      where: {
        id: user.id
      },
      data: {
        refreshToken: pair.refresh
      }
    })
    return {
      user: user,
      pair: pair
    }
  }
}