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
exports.AccountService = void 0;
const common_1 = require("@nestjs/common");
const provider_service_1 = require("../../providers/database/prisma/provider.service");
const snoowrap = require("snoowrap");
const config_interface_1 = require("../../configuration/app/config.interface");
let AccountService = class AccountService {
    constructor(prismaService, appConfigService) {
        this.prismaService = prismaService;
        this.appConfigService = appConfigService;
    }
    async getByUser(userFromReq) {
        return this.prismaService.account.findMany({
            where: {
                userId: userFromReq.id
            }
        });
    }
    async create(createAccountDto, userFromReq) {
        const r = new snoowrap({
            userAgent: `${this.appConfigService.name} by /u/${createAccountDto.login}`,
            clientId: createAccountDto.clientId,
            clientSecret: createAccountDto.clientSecret,
            username: createAccountDto.login,
            password: createAccountDto.password
        });
        try {
            await r.getMe().then(e => { }).catch(() => { throw new Error(); });
            const account = await this.prismaService.account.create({
                data: Object.assign(Object.assign({ userAgent: `${this.appConfigService.name} by /u/${createAccountDto.login}` }, createAccountDto), { userId: userFromReq.id })
            });
            return account;
        }
        catch (e) {
            console.log(e);
            throw new common_1.BadRequestException('Incorrect data');
        }
    }
    async delete(id, user) {
        const acc = await this.prismaService.account.findFirst({
            where: {
                id: id,
                userId: user.id
            }
        });
        if (!acc) {
            throw new common_1.BadRequestException('Account not found');
        }
        return this.prismaService.account.delete({
            where: {
                id: id
            }
        });
    }
};
AccountService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(config_interface_1.IAppConfigService)),
    __metadata("design:paramtypes", [provider_service_1.PrismaService, Object])
], AccountService);
exports.AccountService = AccountService;
//# sourceMappingURL=account.service.js.map