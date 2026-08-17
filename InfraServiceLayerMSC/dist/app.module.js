"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const UserController_1 = require("./Controllers/UserController");
const AuthController_1 = require("./Controllers/AuthController");
const HealthController_1 = require("./Controllers/HealthController");
const CourseController_1 = require("./Controllers/CourseController");
const MissionaryController_1 = require("./Controllers/MissionaryController");
const QuizController_1 = require("./Controllers/QuizController");
const DatabaseProvider_1 = require("./Providers/DatabaseProvider");
const UserRepository_1 = require("./Repositories/UserRepository");
const HealthCheckLogRepository_1 = require("./Repositories/HealthCheckLogRepository");
const CourseRepository_1 = require("./Repositories/CourseRepository");
const MissionaryRepository_1 = require("./Repositories/MissionaryRepository");
const QuizRepository_1 = require("./Repositories/QuizRepository");
const UserServices_1 = require("./Services/UserServices");
const AuthServices_1 = require("./Services/AuthServices");
const HealthCheckLogServices_1 = require("./Services/HealthCheckLogServices");
const CourseServices_1 = require("./Services/CourseServices");
const MissionaryServices_1 = require("./Services/MissionaryServices");
const QuizServices_1 = require("./Services/QuizServices");
const PasswordServices_1 = require("./Services/PasswordServices");
const AuthenticationConstants_1 = require("./Constants/AuthenticationConstants");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({
                secret: AuthenticationConstants_1.AuthenticationConstants.JWT_SECRET,
                signOptions: {
                    expiresIn: AuthenticationConstants_1.AuthenticationConstants.JWT_EXPIRES_IN_SECONDS,
                },
            }),
        ],
        controllers: [
            UserController_1.UserController,
            AuthController_1.AuthController,
            HealthController_1.HealthController,
            CourseController_1.CourseController,
            MissionaryController_1.MissionaryController,
            QuizController_1.QuizController,
        ],
        providers: [
            DatabaseProvider_1.DatabaseProvider,
            UserRepository_1.UserRepository,
            HealthCheckLogRepository_1.HealthCheckLogRepository,
            CourseRepository_1.CourseRepository,
            MissionaryRepository_1.MissionaryRepository,
            QuizRepository_1.QuizRepository,
            UserServices_1.UserServices,
            AuthServices_1.AuthServices,
            HealthCheckLogServices_1.HealthCheckLogServices,
            CourseServices_1.CourseServices,
            MissionaryServices_1.MissionaryServices,
            QuizServices_1.QuizServices,
            PasswordServices_1.PasswordServices,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map