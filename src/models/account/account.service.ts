import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { PrismaService } from '../../providers/database/prisma/provider.service'
import * as snoowrap from 'snoowrap'
import { CreateAccountDto } from './dto/create-account.dto'
import { IAppConfigService } from '../../configuration/app/config.interface'
import { IAccessTokenPayload } from '../../auth/interfaces/accessToken.interface'

@Injectable()
export class AccountService {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(IAppConfigService) private readonly appConfigService: IAppConfigService
  ) {}

  async getByUser(userFromReq: IAccessTokenPayload) {
    return this.prismaService.account.findMany({
      where: {
        userId: userFromReq.id
      }
    })
  }

  async create(createAccountDto: CreateAccountDto, userFromReq: IAccessTokenPayload) {
    const r = new snoowrap({
      userAgent: `${this.appConfigService.name} by /u/${createAccountDto.login}`,
      clientId: createAccountDto.clientId,
      clientSecret: createAccountDto.clientSecret,
      username: createAccountDto.login,
      password: createAccountDto.password
    })

    try {
      await r.getMe().then(e => {}).catch(() => { throw new Error() })
      const account = await this.prismaService.account.create({
        data: {
          userAgent: `${this.appConfigService.name} by /u/${createAccountDto.login}`,
          ...createAccountDto,
          userId: userFromReq.id
        }
      })
      return account
    }
    catch (e) {
      console.log(e)
      throw new BadRequestException('Incorrect data')
    }
  }

  async delete(id: string, user: IAccessTokenPayload) {
    const acc = await this.prismaService.account.findFirst({
      where: {
        id: id,
        userId: user.id
      }
    })
    if (!acc) {
      throw new BadRequestException('Account not found')
    }
    return this.prismaService.account.delete({
      where: {
        id: id
      }
    })
  }
}