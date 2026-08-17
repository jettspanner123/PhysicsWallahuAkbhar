"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseNotFoundError = void 0;
class CourseNotFoundError extends Error {
    constructor(courseId) {
        super(`Course with ID '${courseId}' was not found.`);
        this.name = 'CourseNotFoundError';
    }
}
exports.CourseNotFoundError = CourseNotFoundError;
//# sourceMappingURL=CourseNotFoundError.js.map