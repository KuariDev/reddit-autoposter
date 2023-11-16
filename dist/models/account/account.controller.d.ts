import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { IAccessTokenPayload } from '../../auth/interfaces/accessToken.interface';
export declare class AccountController {
    private readonly accountService;
    constructor(accountService: AccountService);
    getByUser(user: IAccessTokenPayload): Promise<(import("@prisma/client/runtime").GetResult<{
        id: string;
        userId: string;
        userAgent: string;
        login: string;
        password: string;
        clientId: string;
        clientSecret: string;
    }, unknown, never> & {})[]>;
    createAccount(createAccountDto: CreateAccountDto, user: IAccessTokenPayload): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        userId: string;
        userAgent: string;
        login: string;
        password: string;
        clientId: string;
        clientSecret: string;
    }, unknown, never> & {}>;
    deleteAccount(id: string, user: IAccessTokenPayload): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        userId: string;
        userAgent: string;
        login: string;
        password: string;
        clientId: string;
        clientSecret: string;
    }, unknown, never> & {}>;
}
