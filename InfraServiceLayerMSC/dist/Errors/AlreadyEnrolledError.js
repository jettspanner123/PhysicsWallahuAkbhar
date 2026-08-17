"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlreadyEnrolledError = void 0;
class AlreadyEnrolledError extends Error {
    constructor(courseId) {
        super(`Student is already enrolled in course '${courseId}'.`);
        this.name = 'AlreadyEnrolledError';
    }
}
exports.AlreadyEnrolledError = AlreadyEnrolledError;
//# sourceMappingURL=AlreadyEnrolledError.js.map