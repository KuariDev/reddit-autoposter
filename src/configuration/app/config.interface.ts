export interface IAppConfigService {
  get port(): number;
  get backendUrl(): string;
  get frontendUrl(): string;
  get adminPassword(): string;
  get name(): string
}

export const IAppConfigService = Symbol('IAppConfigService');
