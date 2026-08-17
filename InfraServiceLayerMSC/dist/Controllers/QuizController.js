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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizController = void 0;
const common_1 = require("@nestjs/common");
const QuizServices_1 = require("../Services/QuizServices");
const CreateQuizDto_1 = require("../Models/CreateQuizDto");
const SubmitAttemptDto_1 = require("../Models/SubmitAttemptDto");
const ResponseModel_1 = require("../Models/ResponseModel");
const HttpExceptionFilter_1 = require("../Filters/HttpExceptionFilter");
const JwtAuthGuard_1 = require("../Guards/JwtAuthGuard");
let QuizController = class QuizController {
    quizServices;
    constructor(quizServices) {
        this.quizServices = quizServices;
    }
    async create(req, createQuizDto) {
        if (req.user.role !== 'TEACHER' && req.user.role !== 'ADMIN') {
            throw new common_1.UnauthorizedException('Only teachers or administrators can create quizzes.');
        }
        if (!createQuizDto.title || !createQuizDto.courseId || !createQuizDto.moduleName || !createQuizDto.questions || createQuizDto.questions.length === 0) {
            throw new common_1.BadRequestException('Title, course ID, module name, and questions list are required.');
        }
        try {
            const quiz = await this.quizServices.createQuiz(createQuizDto.courseId, createQuizDto.moduleName, createQuizDto.title, createQuizDto.questions);
            return new ResponseModel_1.ResponseModel(true, 'Quiz created successfully.', quiz);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to create quiz.');
        }
    }
    async seed(req) {
        if (req.user.role !== 'TEACHER' && req.user.role !== 'ADMIN') {
            throw new common_1.UnauthorizedException('Only teachers or administrators can seed default quizzes.');
        }
        try {
            const result = await this.quizServices.seedDefaultQuizzes();
            return new ResponseModel_1.ResponseModel(true, 'Default quizzes seeded successfully.', result);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to seed default quizzes.');
        }
    }
    async getByCourse(courseId) {
        try {
            const quizzes = await this.quizServices.getQuizzesByCourse(courseId);
            return new ResponseModel_1.ResponseModel(true, 'Quizzes retrieved successfully.', quizzes);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to retrieve quizzes.');
        }
    }
    async getMyAttempts(req) {
        try {
            const studentId = req.user.sub;
            const attempts = await this.quizServices.getStudentAttempts(studentId);
            return new ResponseModel_1.ResponseModel(true, 'My quiz attempts retrieved successfully.', attempts);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to retrieve attempts.');
        }
    }
    async getById(id) {
        try {
            const quiz = await this.quizServices.getQuizById(id);
            return new ResponseModel_1.ResponseModel(true, 'Quiz retrieved successfully.', quiz);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Failed to retrieve quiz.');
        }
    }
    async submitAttempt(req, id, submitAttemptDto) {
        const studentId = req.user.sub;
        if (!submitAttemptDto.answers || submitAttemptDto.answers.length === 0) {
            throw new common_1.BadRequestException('Answers array is required.');
        }
        try {
            const attempt = await this.quizServices.submitAttempt(id, studentId, submitAttemptDto.answers);
            return new ResponseModel_1.ResponseModel(true, 'Quiz attempt submitted successfully.', attempt);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Failed to submit quiz attempt.');
        }
    }
};
exports.QuizController = QuizController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(JwtAuthGuard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CreateQuizDto_1.CreateQuizDto]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('seed'),
    (0, common_1.UseGuards)(JwtAuthGuard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "seed", null);
__decorate([
    (0, common_1.Get)('course/:courseId'),
    (0, common_1.UseGuards)(JwtAuthGuard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "getByCourse", null);
__decorate([
    (0, common_1.Get)('attempts/my'),
    (0, common_1.UseGuards)(JwtAuthGuard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "getMyAttempts", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(JwtAuthGuard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "getById", null);
__decorate([
    (0, common_1.Post)(':id/attempt'),
    (0, common_1.UseGuards)(JwtAuthGuard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, SubmitAttemptDto_1.SubmitAttemptDto]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "submitAttempt", null);
exports.QuizController = QuizController = __decorate([
    (0, common_1.Controller)('quizzes'),
    (0, common_1.UseFilters)(HttpExceptionFilter_1.HttpExceptionFilter),
    __metadata("design:paramtypes", [QuizServices_1.QuizServices])
], QuizController);
//# sourceMappingURL=QuizController.js.map