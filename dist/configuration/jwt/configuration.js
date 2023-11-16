"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('jwt', () => ({
    access: process.env.JWT_ACCESS_SECRET,
    accessTTL: 1000 * 60 * 60 * 60,
    refresh: process.env.JWT_REFRESH_SECRET,
    refreshTTL: 1000 * 60 * 60 * 24 * 3
}));
//# sourceMappingURL=configuration.js.map