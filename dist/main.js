"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const helmet_1 = require("helmet");
const http_exception_filter_1 = require("./core/filters/http-exception.filter");
const transform_interceptor_1 = require("./core/interceptors/transform.interceptor");
const config_1 = require("@nestjs/config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: true
    });
    app.setGlobalPrefix('api');
    app.use((0, helmet_1.default)());
    app.use(cookieParser());
    app.use(compression());
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    app.useGlobalInterceptors(new transform_interceptor_1.TransformInterceptor());
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    const configService = app.get(config_1.ConfigService);
    await app.listen(configService.get('app.port'), '127.0.0.1', () => {
        console.log('listening on port ' + configService.get('app.port'));
    });
}
bootstrap();
//# sourceMappingURL=main.js.map