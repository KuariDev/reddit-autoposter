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
exports.JwtService = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
const config_interface_1 = require("../configuration/jwt/config.interface");
let JwtService = class JwtService {
    constructor(jwtConfigService) {
        this.jwtConfigService = jwtConfigService;
    }
    getNewPair(payload) {
        const access = jwt.sign(payload, this.jwtConfigService.access, {
            expiresIn: String(this.jwtConfigService.accessTTL)
        });
        const refresh = jwt.sign({ date: new Date(), id: payload.id }, this.jwtConfigService.refresh, {
            expiresIn: String(this.jwtConfigService.refreshTTL)
        });
        return { access, refresh };
    }
    accessVerify(token) {
        try {
            const payload = jwt.verify(token, this.jwtConfigService.access, {
                ignoreExpiration: false,
                maxAge: String(this.jwtConfigService.accessTTL)
            });
            return payload;
        }
        catch (e) {
            throw new common_1.UnauthorizedException('Wrong or expired access token');
        }
    }
    refreshVerify(token) {
        try {
            const payload = jwt.verify(token, this.jwtConfigService.refresh, {
                ignoreExpiration: false,
                maxAge: String(this.jwtConfigService.refreshTTL)
            });
            return payload;
        }
        catch (e) {
            throw new common_1.UnauthorizedException('Wrong or expired refresh token');
        }
    }
};
JwtService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(config_interface_1.IJwtConfigService)),
    __metadata("design:paramtypes", [Object])
], JwtService);
exports.JwtService = JwtService;
//# sourceMappingURL=jwt.service.js.map