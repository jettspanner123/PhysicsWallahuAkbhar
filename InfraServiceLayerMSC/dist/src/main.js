"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
class Application {
    constructor() { }
    static async bootstrap() {
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        await app.listen(process.env.PORT ?? 3000);
    }
}
exports.Application = Application;
Application.bootstrap();
//# sourceMappingURL=main.js.map