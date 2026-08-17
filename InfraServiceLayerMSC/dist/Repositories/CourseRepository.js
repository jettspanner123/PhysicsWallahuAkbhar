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
exports.CourseRepository = void 0;
const common_1 = require("@nestjs/common");
const DatabaseProvider_1 = require("../Providers/DatabaseProvider");
let CourseRepository = class CourseRepository {
    databaseProvider;
    constructor(databaseProvider) {
        this.databaseProvider = databaseProvider;
    }
    async findAll() {
        return this.databaseProvider.courseModel.findMany();
    }
    async findById(id) {
        return this.databaseProvider.courseModel.findUnique({
            where: { id: id },
        });
    }
    async findEnrolled(studentId) {
        return this.databaseProvider.enrollmentModel.findMany({
            where: { studentId: studentId },
            include: {
                course: true,
            },
        });
    }
    async findEnrollment(studentId, courseId) {
        return this.databaseProvider.enrollmentModel.findUnique({
            where: {
                studentId_courseId: {
                    studentId: studentId,
                    courseId: courseId,
                },
            },
        });
    }
    async enroll(studentId, courseId) {
        return this.databaseProvider.enrollmentModel.create({
            data: {
                studentId: studentId,
                courseId: courseId,
                progress: 0,
            },
        });
    }
    async updateProgress(studentId, courseId, progress) {
        return this.databaseProvider.enrollmentModel.update({
            where: {
                studentId_courseId: {
                    studentId: studentId,
                    courseId: courseId,
                },
            },
            data: {
                progress: progress,
            },
        });
    }
    async createMany(coursesData) {
        await this.databaseProvider.courseModel.createMany({
            data: coursesData,
        });
    }
    async create(courseData) {
        return this.databaseProvider.courseModel.create({
            data: courseData,
        });
    }
    async delete(id) {
        return this.databaseProvider.courseModel.delete({
            where: { id: id },
        });
    }
};
exports.CourseRepository = CourseRepository;
exports.CourseRepository = CourseRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [DatabaseProvider_1.DatabaseProvider])
], CourseRepository);
//# sourceMappingURL=CourseRepository.js.map