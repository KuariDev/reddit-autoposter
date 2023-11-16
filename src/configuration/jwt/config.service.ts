import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IJwtConfigService } from './config.interface'

@Injectable()
export class JwtConfigService implements IJwtConfigService {
  constructor(private readonly configService: ConfigService) {}

  get access(): string {
    return this.configService.get<string>(`jwt.access`);
  }

  get accessTTL(): number {
    return Number(this.configService.get('jwt.accessTTL'));
  }

  get refresh(): string {
    return this.configService.get<string>(`jwt.refresh`);
  }

  get refreshTTL(): number {
    return Number(this.configService.get('jwt.refreshTTL'));
  }
}
