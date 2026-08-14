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
exports.UserServices = void 0;
const common_1 = require("@nestjs/common");
const UserRepository_1 = require("../Repositories/UserRepository");
const PasswordServices_1 = require("./PasswordServices");
const EmailAlreadyExistsError_1 = require("../Errors/EmailAlreadyExistsError");
const InvalidCredentialsError_1 = require("../Errors/InvalidCredentialsError");
const UserNotFoundError_1 = require("../Errors/UserNotFoundError");
let UserServices = class UserServices {
    userRepository;
    passwordServices;
    constructor(userRepository, passwordServices) {
        this.userRepository = userRepository;
        this.passwordServices = passwordServices;
    }
    async signup(email, password, name, role) {
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser !== null) {
            throw new EmailAlreadyExistsError_1.EmailAlreadyExistsError(email);
        }
        const passwordHash = await this.passwordServices.hashPassword(password);
        return this.userRepository.create(email, passwordHash, name, role);
    }
    async login(email, password) {
        const user = await this.userRepository.findByEmail(email);
        if (user === null) {
            throw new InvalidCredentialsError_1.InvalidCredentialsError();
        }
        const passwordHash = await this.userRepository.getPasswordHashByEmail(email);
        if (passwordHash === null) {
            throw new InvalidCredentialsError_1.InvalidCredentialsError();
        }
        const isPasswordValid = await this.passwordServices.verifyPassword(password, passwordHash);
        if (isPasswordValid === false) {
            throw new InvalidCredentialsError_1.InvalidCredentialsError();
        }
        return user;
    }
    async getProfile(id) {
        const user = await this.userRepository.findById(id);
        if (user === null) {
            throw new UserNotFoundError_1.UserNotFoundError(id);
        }
        return user;
    }
    async updateProfile(id, name, email) {
        const user = await this.userRepository.findById(id);
        if (user === null) {
            throw new UserNotFoundError_1.UserNotFoundError(id);
        }
        if (email && email !== user.email) {
            const existingUser = await this.userRepository.findByEmail(email);
            if (existingUser !== null) {
                throw new EmailAlreadyExistsError_1.EmailAlreadyExistsError(email);
            }
        }
        return this.userRepository.updateProfile(id, name, email);
    }
};
exports.UserServices = UserServices;
exports.UserServices = UserServices = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [UserRepository_1.UserRepository,
        PasswordServices_1.PasswordServices])
], UserServices);
//# sourceMappingURL=UserServices.js.map