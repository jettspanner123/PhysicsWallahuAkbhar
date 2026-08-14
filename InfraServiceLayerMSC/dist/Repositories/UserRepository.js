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
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const DatabaseProvider_1 = require("../Providers/DatabaseProvider");
const UserModel_1 = require("../Models/UserModel");
let UserRepository = class UserRepository {
    databaseProvider;
    constructor(databaseProvider) {
        this.databaseProvider = databaseProvider;
    }
    async create(email, passwordHash, name, role) {
        const user = await this.databaseProvider.userModel.create({
            data: {
                email: email,
                password: passwordHash,
                name: name,
                role: role,
            },
        });
        return new UserModel_1.UserModel(user.id, user.email, user.name, user.role, user.createdAt, user.updatedAt);
    }
    async findByEmail(email) {
        const user = await this.databaseProvider.userModel.findUnique({
            where: { email: email },
        });
        if (user === null) {
            return null;
        }
        return new UserModel_1.UserModel(user.id, user.email, user.name, user.role, user.createdAt, user.updatedAt);
    }
    async findById(id) {
        const user = await this.databaseProvider.userModel.findUnique({
            where: { id: id },
        });
        if (user === null) {
            return null;
        }
        return new UserModel_1.UserModel(user.id, user.email, user.name, user.role, user.createdAt, user.updatedAt);
    }
    async getPasswordHashByEmail(email) {
        const user = await this.databaseProvider.userModel.findUnique({
            where: { email: email },
            select: { password: true },
        });
        if (user === null) {
            return null;
        }
        return user.password;
    }
    async updateProfile(id, name, email) {
        const updateData = {};
        if (name !== undefined) {
            updateData.name = name;
        }
        if (email !== undefined) {
            updateData.email = email;
        }
        const user = await this.databaseProvider.userModel.update({
            where: { id: id },
            data: updateData,
        });
        return new UserModel_1.UserModel(user.id, user.email, user.name, user.role, user.createdAt, user.updatedAt);
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [DatabaseProvider_1.DatabaseProvider])
], UserRepository);
//# sourceMappingURL=UserRepository.js.map