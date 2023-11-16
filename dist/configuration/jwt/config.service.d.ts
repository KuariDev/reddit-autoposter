import { ConfigService } from '@nestjs/config';
import { IJwtConfigService } from './config.interface';
export declare class JwtConfigService implements IJwtConfigService {
    private readonly configService;
    constructor(configService: ConfigService);
    get access(): string;
    get accessTTL(): number;
    get refresh(): string;
    get refreshTTL(): number;
}
