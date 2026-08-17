"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateQuizDto = exports.CreateQuestionDto = void 0;
class CreateQuestionDto {
    text;
    options;
    correctOption;
    points;
}
exports.CreateQuestionDto = CreateQuestionDto;
class CreateQuizDto {
    title;
    courseId;
    moduleName;
    questions;
}
exports.CreateQuizDto = CreateQuizDto;
//# sourceMappingURL=CreateQuizDto.js.map