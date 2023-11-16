"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_service_1 = require("./jwt.service");
const provider_service_1 = require("../providers/database/prisma/provider.service");
const config_interface_1 = require("../configuration/app/config.interface");
let AuthService = class AuthService {
    constructor(prismaService, jwtService, appConfigService) {
        this.prismaService = prismaService;
        this.jwtService = jwtService;
        this.appConfigService = appConfigService;
    }
    async login(loginDto) {
        const user = await this.prismaService.user.findUnique({
            where: {
                password: loginDto.password
            }
        });
        if (!user) {
            throw new common_1.BadRequestException('Invalid password');
        }
        return this._getNewPairAndUpdateUser(user);
    }
    async refresh(refreshDto) {
        const payload = this.jwtService.refreshVerify(refreshDto.refreshToken);
        const user = await this.prismaService.user.findUnique({
            where: {
                id: payload.id
            }
        });
        if (refreshDto.refreshToken != user.refreshToken) {
            throw new common_1.UnauthorizedException('Wrong or expired refresh token');
        }
        const result = await this._getNewPairAndUpdateUser(user);
        return result.pair;
    }
    async _getNewPairAndUpdateUser(user) {
        const pair = this.jwtService.getNewPair({
            id: user.id,
            role: user.role,
        });
        await this.prismaService.user.update({
            where: {
                id: user.id
            },
            data: {
                refreshToken: pair.refresh
            }
        });
        return {
            user: user,
            pair: pair
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)(config_interface_1.IAppConfigService)),
    __metadata("design:paramtypes", [provider_service_1.PrismaService,
        jwt_service_1.JwtService, Object])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map