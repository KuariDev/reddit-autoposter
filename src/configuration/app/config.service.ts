import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IAppConfigService } from './config.interface';

@Injectable()
export class AppConfigService implements IAppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get port(): number {
    return Number(this.configService.get<string>(`app.port`));
  }

  get backendUrl(): string {
    return this.configService.get<string>("app.backendUrl");
  }

  get frontendUrl(): string {
    return this.configService.get<string>("app.frontendUrl");
  }

  get adminPassword(): string {
    return this.configService.get<string>("app.adminPassword");
  }

  get name(): string {
    return this.configService.get<string>("app.name");
  }
}
