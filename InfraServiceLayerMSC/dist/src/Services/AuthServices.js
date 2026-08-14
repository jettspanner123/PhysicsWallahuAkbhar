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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const UserServices_1 = require("./UserServices");
const AuthResponseModel_1 = require("../Models/AuthResponseModel");
const PasswordsDoNotMatchError_1 = require("../Errors/PasswordsDoNotMatchError");
const InvalidEmailError_1 = require("../Errors/InvalidEmailError");
let AuthServices = class AuthServices {
    userServices;
    jwtService;
    emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    constructor(userServices, jwtService) {
        this.userServices = userServices;
        this.jwtService = jwtService;
    }
    async register(name, email, password, confirmPassword, role) {
        if (this.emailRegex.test(email) === false) {
            throw new InvalidEmailError_1.InvalidEmailError(email);
        }
        if (password !== confirmPassword) {
            throw new PasswordsDoNotMatchError_1.PasswordsDoNotMatchError();
        }
        const user = await this.userServices.signup(email, password, name, role);
        const token = this.generateToken(user);
        return new AuthResponseModel_1.AuthResponseModel(user, token);
    }
    async login(email, password) {
        if (this.emailRegex.test(email) === false) {
            throw new InvalidEmailError_1.InvalidEmailError(email);
        }
        const user = await this.userServices.login(email, password);
        const token = this.generateToken(user);
        return new AuthResponseModel_1.AuthResponseModel(user, token);
    }
    generateToken(user) {
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
        };
        return this.jwtService.sign(payload);
    }
};
exports.AuthServices = AuthServices;
exports.AuthServices = AuthServices = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [UserServices_1.UserServices,
        jwt_1.JwtService])
], AuthServices);
//# sourceMappingURL=AuthServices.js.map