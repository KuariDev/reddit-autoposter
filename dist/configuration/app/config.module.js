"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppConfigModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const Joi = require("joi");
const configuration_1 = require("./configuration");
const config_interface_1 = require("./config.interface");
const config_service_1 = require("./config.service");
let AppConfigModule = class AppConfigModule {
};
AppConfigModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                load: [configuration_1.default],
                validationSchema: Joi.object({
                    APP_PORT: Joi.number().required(),
                    APP_BACKEND_URL: Joi.string().required(),
                    APP_FRONTEND_URL: Joi.string().required(),
                    APP_ADMIN_PASSWORD: Joi.string().required(),
                    APP_NAME: Joi.string().required()
                }),
            }),
        ],
        providers: [
            {
                provide: config_interface_1.IAppConfigService,
                useClass: config_service_1.AppConfigService,
            },
        ],
        exports: [
            {
                provide: config_interface_1.IAppConfigService,
                useClass: config_service_1.AppConfigService,
            },
        ],
    })
], AppConfigModule);
exports.AppConfigModule = AppConfigModule;
//# sourceMappingURL=config.module.js.map