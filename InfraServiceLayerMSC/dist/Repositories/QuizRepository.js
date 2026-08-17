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
exports.QuizRepository = void 0;
const common_1 = require("@nestjs/common");
const DatabaseProvider_1 = require("../Providers/DatabaseProvider");
let QuizRepository = class QuizRepository {
    databaseProvider;
    constructor(databaseProvider) {
        this.databaseProvider = databaseProvider;
    }
    async create(courseId, moduleName, title, questions) {
        return this.databaseProvider.quizModel.create({
            data: {
                title: title,
                courseId: courseId,
                moduleName: moduleName,
                questions: {
                    create: questions.map(q => ({
                        text: q.text,
                        options: JSON.stringify(q.options),
                        correctOption: q.correctOption,
                        points: q.points ?? 1.0
                    }))
                }
            },
            include: {
                questions: true
            }
        });
    }
    async findAll() {
        return this.databaseProvider.quizModel.findMany({
            include: {
                questions: true,
                attempts: true
            }
        });
    }
    async findByCourseId(courseId) {
        return this.databaseProvider.quizModel.findMany({
            where: { courseId: courseId },
            include: {
                questions: true,
                attempts: true
            }
        });
    }
    async findById(id) {
        return this.databaseProvider.quizModel.findUnique({
            where: { id: id },
            include: {
                questions: true,
                attempts: true
            }
        });
    }
    async createAttempt(quizId, studentId, score, answers) {
        return this.databaseProvider.quizAttemptModel.create({
            data: {
                quizId: quizId,
                studentId: studentId,
                score: score,
                answers: JSON.stringify(answers)
            }
        });
    }
    async findAttemptsByStudentId(studentId) {
        return this.databaseProvider.quizAttemptModel.findMany({
            where: { studentId: studentId },
            include: {
                quiz: true
            }
        });
    }
    async findAttemptsByStudentAndQuiz(studentId, quizId) {
        return this.databaseProvider.quizAttemptModel.findMany({
            where: {
                studentId: studentId,
                quizId: quizId
            },
            orderBy: {
                completedAt: 'desc'
            }
        });
    }
};
exports.QuizRepository = QuizRepository;
exports.QuizRepository = QuizRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [DatabaseProvider_1.DatabaseProvider])
], QuizRepository);
//# sourceMappingURL=QuizRepository.js.map