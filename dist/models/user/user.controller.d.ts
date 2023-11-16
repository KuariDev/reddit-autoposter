import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getAll(): Promise<(import("@prisma/client/runtime").GetResult<{
        id: string;
        password: string;
        role: import(".prisma/client").Role;
        refreshToken: string;
        created_at: Date;
    }, unknown, never> & {})[]>;
    create(createUserDto: CreateUserDto): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        password: string;
        role: import(".prisma/client").Role;
        refreshToken: string;
        created_at: Date;
    }, unknown, never> & {}>;
    delete(id: string): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        password: string;
        role: import(".prisma/client").Role;
        refreshToken: string;
        created_at: Date;
    }, unknown, never> & {}>;
}
