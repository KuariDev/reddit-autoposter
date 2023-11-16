import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '../../auth/jwt.service';
import { PrismaService } from '../../providers/database/prisma/provider.service';
export declare class AdminGuard implements CanActivate {
    private readonly jwtService;
    private readonly prismaService;
    constructor(jwtService: JwtService, prismaService: PrismaService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
