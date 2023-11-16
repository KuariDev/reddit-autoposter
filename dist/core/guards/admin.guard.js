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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_service_1 = require("../../auth/jwt.service");
const provider_service_1 = require("../../providers/database/prisma/provider.service");
const client_1 = require("@prisma/client");
let AdminGuard = class AdminGuard {
    constructor(jwtService, prismaService) {
        this.jwtService = jwtService;
        this.prismaService = prismaService;
    }
    async canActivate(context) {
        var _a;
        const request = context.switchToHttp().getRequest();
        const header = await ((_a = request.headers) === null || _a === void 0 ? void 0 : _a.authorization);
        if (!header) {
            throw new common_1.UnauthorizedException();
        }
        const type = header === null || header === void 0 ? void 0 : header.split(' ')[0];
        const token = header === null || header === void 0 ? void 0 : header.split(' ')[1];
        if (type != 'Bearer' || !token) {
            throw new common_1.UnauthorizedException('Wrong access token');
        }
        const payload = this.jwtService.accessVerify(token);
        if (payload.role != client_1.Role.ADMIN) {
            throw new common_1.ForbiddenException();
        }
        request.user = payload;
        return true;
    }
};
AdminGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_service_1.JwtService,
        provider_service_1.PrismaService])
], AdminGuard);
exports.AdminGuard = AdminGuard;
//# sourceMappingURL=admin.guard.js.map