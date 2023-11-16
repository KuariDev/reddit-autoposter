export interface IJwtConfigService {
  get access(): string;
  get refresh(): string;
  get accessTTL(): number;
  get refreshTTL(): number;
}

export const IJwtConfigService = Symbol('IJwtConfigService');
