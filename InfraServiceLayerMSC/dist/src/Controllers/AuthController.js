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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const AuthServices_1 = require("../Services/AuthServices");
const SignupRequestDto_1 = require("../Models/SignupRequestDto");
const LoginRequestDto_1 = require("../Models/LoginRequestDto");
const ResponseModel_1 = require("../Models/ResponseModel");
const HttpExceptionFilter_1 = require("../Filters/HttpExceptionFilter");
const InvalidEmailError_1 = require("../Errors/InvalidEmailError");
const PasswordsDoNotMatchError_1 = require("../Errors/PasswordsDoNotMatchError");
const EmailAlreadyExistsError_1 = require("../Errors/EmailAlreadyExistsError");
const InvalidCredentialsError_1 = require("../Errors/InvalidCredentialsError");
let AuthController = class AuthController {
    authServices;
    constructor(authServices) {
        this.authServices = authServices;
    }
    async register(signupRequestDto) {
        try {
            const data = await this.authServices.register(signupRequestDto.name, signupRequestDto.email, signupRequestDto.password, signupRequestDto.confirmPassword, signupRequestDto.role);
            return new ResponseModel_1.ResponseModel(true, 'User registered successfully.', data);
        }
        catch (error) {
            if (error instanceof InvalidEmailError_1.InvalidEmailError || error instanceof PasswordsDoNotMatchError_1.PasswordsDoNotMatchError) {
                throw new common_1.BadRequestException(error.message);
            }
            if (error instanceof EmailAlreadyExistsError_1.EmailAlreadyExistsError) {
                throw new common_1.ConflictException(error.message);
            }
            throw new common_1.InternalServerErrorException('An error occurred during registration.');
        }
    }
    async login(loginRequestDto) {
        try {
            const data = await this.authServices.login(loginRequestDto.email, loginRequestDto.password);
            return new ResponseModel_1.ResponseModel(true, 'User logged in successfully.', data);
        }
        catch (error) {
            if (error instanceof InvalidEmailError_1.InvalidEmailError) {
                throw new common_1.BadRequestException(error.message);
            }
            if (error instanceof InvalidCredentialsError_1.InvalidCredentialsError) {
                throw new common_1.UnauthorizedException(error.message);
            }
            throw new common_1.InternalServerErrorException('An error occurred during login.');
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SignupRequestDto_1.SignupRequestDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LoginRequestDto_1.LoginRequestDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    (0, common_1.UseFilters)(HttpExceptionFilter_1.HttpExceptionFilter),
    __metadata("design:paramtypes", [AuthServices_1.AuthServices])
], AuthController);
//# sourceMappingURL=AuthController.js.map