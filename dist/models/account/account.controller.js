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
exports.AccountController = void 0;
const common_1 = require("@nestjs/common");
const account_service_1 = require("./account.service");
const auth_guard_1 = require("../../core/guards/auth.guard");
const create_account_dto_1 = require("./dto/create-account.dto");
const userFromReq_decorator_1 = require("../../core/decorators/userFromReq.decorator");
let AccountController = class AccountController {
    constructor(accountService) {
        this.accountService = accountService;
    }
    async getByUser(user) {
        return this.accountService.getByUser(user);
    }
    async createAccount(createAccountDto, user) {
        return this.accountService.create(createAccountDto, user);
    }
    async deleteAccount(id, user) {
        return this.accountService.delete(id, user);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, userFromReq_decorator_1.UserFromReq)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "getByUser", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, userFromReq_decorator_1.UserFromReq)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_account_dto_1.CreateAccountDto, Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "createAccount", null);
__decorate([
    (0, common_1.Delete)("/:id"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, userFromReq_decorator_1.UserFromReq)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "deleteAccount", null);
AccountController = __decorate([
    (0, common_1.Controller)('account'),
    __metadata("design:paramtypes", [account_service_1.AccountService])
], AccountController);
exports.AccountController = AccountController;
//# sourceMappingURL=account.controller.js.map