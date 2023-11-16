import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '../../auth/jwt.service'
import { PrismaService } from '../../providers/database/prisma/provider.service'
import { IAccessTokenPayload } from '../../auth/interfaces/accessToken.interface'
import { Role } from '@prisma/client'

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const header = await request.headers?.authorization

    if (!header) {
      throw new UnauthorizedException()
    }

    const type = header?.split(' ')[0]
    const token = header?.split(' ')[1]
    if (type != 'Bearer' || !token) {
      throw new UnauthorizedException('Wrong access token')
    }

    const payload: IAccessTokenPayload = this.jwtService.accessVerify(token)
    if (payload.role != Role.ADMIN) {
      throw new ForbiddenException()
    }
    request.user = payload
    return true
  }
}