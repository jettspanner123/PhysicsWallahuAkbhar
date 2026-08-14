"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidEmailError = void 0;
class InvalidEmailError extends Error {
    constructor(email) {
        super(`The email format for '${email}' is invalid.`);
        this.name = 'InvalidEmailError';
    }
}
exports.InvalidEmailError = InvalidEmailError;
//# sourceMappingURL=InvalidEmailError.js.map