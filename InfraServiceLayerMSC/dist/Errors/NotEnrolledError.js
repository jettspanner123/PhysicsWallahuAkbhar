"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotEnrolledError = void 0;
class NotEnrolledError extends Error {
    constructor(courseId) {
        super(`Student is not enrolled in course '${courseId}'.`);
        this.name = 'NotEnrolledError';
    }
}
exports.NotEnrolledError = NotEnrolledError;
//# sourceMappingURL=NotEnrolledError.js.map