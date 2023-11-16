"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const process = require("process");
exports.default = (0, config_1.registerAs)('app', () => ({
    port: process.env.APP_PORT,
    backendUrl: process.env.APP_BACKEND_URL,
    frontendUrl: process.env.APP_FRONTEND_URL,
    adminPassword: process.env.APP_ADMIN_PASSWORD,
    name: process.env.APP_NAME
}));
//# sourceMappingURL=configuration.js.map