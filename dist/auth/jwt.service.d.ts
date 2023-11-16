import { IAccessTokenPayload } from './interfaces/accessToken.interface';
import { IRefreshTokenPayload } from './interfaces/refreshToken.interface';
import { IJwtConfigService } from '../configuration/jwt/config.interface';
export declare class JwtService {
    private readonly jwtConfigService;
    constructor(jwtConfigService: IJwtConfigService);
    getNewPair(payload: IAccessTokenPayload): {
        access: string;
        refresh: string;
    };
    accessVerify(token: string): IAccessTokenPayload;
    refreshVerify(token: string): IRefreshTokenPayload;
}
