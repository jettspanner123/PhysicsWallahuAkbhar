"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
require("dotenv/config");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
class Application {
    constructor() { }
    static async bootstrap() {
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        app.enableCors({
            origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
        });
        await app.listen(process.env.PORT ?? 3000);
    }
}
exports.Application = Application;
Application.bootstrap();
//# sourceMappingURL=main.js.map