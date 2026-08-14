"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordsDoNotMatchError = void 0;
class PasswordsDoNotMatchError extends Error {
    constructor() {
        super('Password and confirm password do not match.');
        this.name = 'PasswordsDoNotMatchError';
    }
}
exports.PasswordsDoNotMatchError = PasswordsDoNotMatchError;
//# sourceMappingURL=PasswordsDoNotMatchError.js.map