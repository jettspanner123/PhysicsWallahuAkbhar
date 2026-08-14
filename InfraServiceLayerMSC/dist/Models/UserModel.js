"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
class UserModel {
    id;
    email;
    name;
    role;
    createdAt;
    updatedAt;
    constructor(id, email, name, role, createdAt, updatedAt) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.role = role;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
exports.UserModel = UserModel;
//# sourceMappingURL=UserModel.js.map