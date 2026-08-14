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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const UserServices_1 = require("../Services/UserServices");
const SignupDto_1 = require("../Models/SignupDto");
const LoginDto_1 = require("../Models/LoginDto");
const UpdateProfileDto_1 = require("../Models/UpdateProfileDto");
const EmailAlreadyExistsError_1 = require("../Errors/EmailAlreadyExistsError");
const InvalidCredentialsError_1 = require("../Errors/InvalidCredentialsError");
const UserNotFoundError_1 = require("../Errors/UserNotFoundError");
let UserController = class UserController {
    userServices;
    constructor(userServices) {
        this.userServices = userServices;
    }
    async signup(signupDto) {
        try {
            return await this.userServices.signup(signupDto.email, signupDto.password, signupDto.name, signupDto.role);
        }
        catch (error) {
            if (error instanceof EmailAlreadyExistsError_1.EmailAlreadyExistsError) {
                throw new common_1.ConflictException(error.message);
            }
            throw new common_1.InternalServerErrorException('An unexpected error occurred during signup.');
        }
    }
    async login(loginDto) {
        try {
            return await this.userServices.login(loginDto.email, loginDto.password);
        }
        catch (error) {
            if (error instanceof InvalidCredentialsError_1.InvalidCredentialsError) {
                throw new common_1.UnauthorizedException(error.message);
            }
            throw new common_1.InternalServerErrorException('An unexpected error occurred during login.');
        }
    }
    async getProfile(id) {
        try {
            return await this.userServices.getProfile(id);
        }
        catch (error) {
            if (error instanceof UserNotFoundError_1.UserNotFoundError) {
                throw new common_1.NotFoundException(error.message);
            }
            throw new common_1.InternalServerErrorException('An unexpected error occurred retrieving profile.');
        }
    }
    async updateProfile(id, updateProfileDto) {
        try {
            return await this.userServices.updateProfile(id, updateProfileDto.name);
        }
        catch (error) {
            if (error instanceof UserNotFoundError_1.UserNotFoundError) {
                throw new common_1.NotFoundException(error.message);
            }
            throw new common_1.InternalServerErrorException('An unexpected error occurred updating profile.');
        }
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)('signup'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SignupDto_1.SignupDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signup", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LoginDto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('profile/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Put)('profile/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateProfileDto_1.UpdateProfileDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateProfile", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [UserServices_1.UserServices])
], UserController);
//# sourceMappingURL=UserController.js.map