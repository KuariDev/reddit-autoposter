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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const provider_service_1 = require("../../providers/database/prisma/provider.service");
const client_1 = require("@prisma/client");
const config_interface_1 = require("../../configuration/app/config.interface");
let UserService = class UserService {
    constructor(prismaService, appConfigService) {
        this.prismaService = prismaService;
        this.appConfigService = appConfigService;
        this._createAdmin();
    }
    async getAll() {
        return this.prismaService.user.findMany({
            orderBy: {
                created_at: 'desc'
            }
        });
    }
    async delete(id) {
        const user = await this.prismaService.user.findUnique({
            where: {
                id: id
            }
        });
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        return this.prismaService.user.delete({
            where: {
                id: id
            }
        });
    }
    async createUser(createUserDto) {
        const candidate = await this.prismaService.user.findUnique({
            where: {
                password: createUserDto.password
            }
        });
        if (candidate) {
            throw new common_1.BadRequestException('User already exists');
        }
        return this.prismaService.user.create({
            data: {
                password: createUserDto.password
            }
        });
    }
    async _createAdmin() {
        const admin = await this.prismaService.user.findFirst({
            where: {
                role: client_1.Role.ADMIN
            }
        });
        if (!admin) {
            await this.prismaService.user.create({
                data: {
                    password: this.appConfigService.adminPassword,
                    role: client_1.Role.ADMIN
                }
            });
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(config_interface_1.IAppConfigService)),
    __metadata("design:paramtypes", [provider_service_1.PrismaService, Object])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map