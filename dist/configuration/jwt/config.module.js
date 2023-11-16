"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtConfigModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const Joi = require("joi");
const configuration_1 = require("./configuration");
const config_interface_1 = require("./config.interface");
const config_service_1 = require("./config.service");
let JwtConfigModule = class JwtConfigModule {
};
JwtConfigModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                load: [configuration_1.default],
                validationSchema: Joi.object({
                    JWT_ACCESS_SECRET: Joi.string().required(),
                    JWT_REFRESH_SECRET: Joi.string().required(),
                }),
            }),
        ],
        providers: [
            {
                provide: config_interface_1.IJwtConfigService,
                useClass: config_service_1.JwtConfigService,
            },
        ],
        exports: [
            {
                provide: config_interface_1.IJwtConfigService,
                useClass: config_service_1.JwtConfigService,
            },
        ],
    })
], JwtConfigModule);
exports.JwtConfigModule = JwtConfigModule;
//# sourceMappingURL=config.module.js.map