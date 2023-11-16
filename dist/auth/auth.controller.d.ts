import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
}
