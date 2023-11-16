import { ConfigService } from '@nestjs/config';
import { IAppConfigService } from './config.interface';
export declare class AppConfigService implements IAppConfigService {
    private readonly configService;
    constructor(configService: ConfigService);
    get port(): number;
    get backendUrl(): string;
    get frontendUrl(): string;
    get adminPassword(): string;
    get name(): string;
}
