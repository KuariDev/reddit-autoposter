import { PrismaService } from '../../providers/database/prisma/provider.service';
import { Role } from '@prisma/client';
import { IAppConfigService } from '../../configuration/app/config.interface';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UserService {
    private readonly prismaService;
    private readonly appConfigService;
    constructor(prismaService: PrismaService, appConfigService: IAppConfigService);
    getAll(): Promise<(import("@prisma/client/runtime").GetResult<{
        id: string;
        password: string;
        role: Role;
        refreshToken: string;
        created_at: Date;
    }, unknown, never> & {})[]>;
    delete(id: string): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        password: string;
        role: Role;
        refreshToken: string;
        created_at: Date;
    }, unknown, never> & {}>;
    createUser(createUserDto: CreateUserDto): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        password: string;
        role: Role;
        refreshToken: string;
        created_at: Date;
    }, unknown, never> & {}>;
    private _createAdmin;
}
