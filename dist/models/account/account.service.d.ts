import { PrismaService } from '../../providers/database/prisma/provider.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { IAppConfigService } from '../../configuration/app/config.interface';
import { IAccessTokenPayload } from '../../auth/interfaces/accessToken.interface';
export declare class AccountService {
    private readonly prismaService;
    private readonly appConfigService;
    constructor(prismaService: PrismaService, appConfigService: IAppConfigService);
    getByUser(userFromReq: IAccessTokenPayload): Promise<(import("@prisma/client/runtime").GetResult<{
        id: string;
        userId: string;
        userAgent: string;
        login: string;
        password: string;
        clientId: string;
        clientSecret: string;
    }, unknown, never> & {})[]>;
    create(createAccountDto: CreateAccountDto, userFromReq: IAccessTokenPayload): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        userId: string;
        userAgent: string;
        login: string;
        password: string;
        clientId: string;
        clientSecret: string;
    }, unknown, never> & {}>;
    delete(id: string, user: IAccessTokenPayload): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        userId: string;
        userAgent: string;
        login: string;
        password: string;
        clientId: string;
        clientSecret: string;
    }, unknown, never> & {}>;
}
