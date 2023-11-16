import { JwtService } from './jwt.service';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { PrismaService } from "../providers/database/prisma/provider.service";
import { IAppConfigService } from '../configuration/app/config.interface';
export declare class AuthService {
    private readonly prismaService;
    private readonly jwtService;
    private readonly appConfigService;
    constructor(prismaService: PrismaService, jwtService: JwtService, appConfigService: IAppConfigService);
    login(loginDto: LoginDto): Promise<{
        user: import("@prisma/client/runtime").GetResult<{
            id: string;
            password: string;
            role: import(".prisma/client").Role;
            refreshToken: string;
            created_at: Date;
        }, unknown, never> & {};
        pair: {
            access: string;
            refresh: string;
        };
    }>;
    refresh(refreshDto: RefreshDto): Promise<{
        access: string;
        refresh: string;
    }>;
    private _getNewPairAndUpdateUser;
}
