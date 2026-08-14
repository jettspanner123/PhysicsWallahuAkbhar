"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailAlreadyExistsError = void 0;
class EmailAlreadyExistsError extends Error {
    constructor(email) {
        super(`Email '${email}' is already registered.`);
        this.name = 'EmailAlreadyExistsError';
    }
}
exports.EmailAlreadyExistsError = EmailAlreadyExistsError;
//# sourceMappingURL=EmailAlreadyExistsError.js.map