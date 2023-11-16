import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { PrismaService } from '../../providers/database/prisma/provider.service'
import { Role } from '@prisma/client'
import { IAppConfigService } from '../../configuration/app/config.interface'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(IAppConfigService) private readonly appConfigService: IAppConfigService
  ) {
    this._createAdmin()
  }

  async getAll() {
    return this.prismaService.user.findMany({
      orderBy: {
        created_at: 'desc'
      }
    })
  }

  async delete(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: id
      }
    })
    if (!user) {
      throw new BadRequestException('User not found')
    }
    return this.prismaService.user.delete({
      where: {
        id: id
      }
    })
  }

  async createUser(createUserDto: CreateUserDto) {
    const candidate = await this.prismaService.user.findUnique({
      where: {
        password: createUserDto.password
      }
    })
    if (candidate) {
      throw new BadRequestException('User already exists')
    }
    return this.prismaService.user.create({
      data: {
        password: createUserDto.password
      }
    })
  }

  private async _createAdmin() {
    const admin = await this.prismaService.user.findFirst({
      where: {
        role: Role.ADMIN
      }
    })
    if (!admin) {
      await this.prismaService.user.create({
        data: {
          password: this.appConfigService.adminPassword,
          role: Role.ADMIN
        }
      })
    }
  }
}