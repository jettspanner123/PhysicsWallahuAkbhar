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
exports.CourseController = void 0;
const common_1 = require("@nestjs/common");
const CourseServices_1 = require("../Services/CourseServices");
const ResponseModel_1 = require("../Models/ResponseModel");
const EnrollCourseDto_1 = require("../Models/EnrollCourseDto");
const UpdateProgressDto_1 = require("../Models/UpdateProgressDto");
const CreateCourseDto_1 = require("../Models/CreateCourseDto");
const JwtAuthGuard_1 = require("../Guards/JwtAuthGuard");
const HttpExceptionFilter_1 = require("../Filters/HttpExceptionFilter");
const CourseNotFoundError_1 = require("../Errors/CourseNotFoundError");
const AlreadyEnrolledError_1 = require("../Errors/AlreadyEnrolledError");
const NotEnrolledError_1 = require("../Errors/NotEnrolledError");
let CourseController = class CourseController {
    courseServices;
    constructor(courseServices) {
        this.courseServices = courseServices;
    }
    async create(req, createCourseDto) {
        if (req.user.role !== 'TEACHER' && req.user.role !== 'ADMIN') {
            throw new common_1.UnauthorizedException('Only teachers or administrators can create courses.');
        }
        try {
            const course = await this.courseServices.createCourse(req.user.sub, createCourseDto);
            return new ResponseModel_1.ResponseModel(true, 'Course created successfully.', course);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to create course.');
        }
    }
    async seed() {
        try {
            const count = await this.courseServices.seedCourses();
            return new ResponseModel_1.ResponseModel(true, 'Database seeded with default courses successfully.', { count: count });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to seed database with courses.');
        }
    }
    async getCatalog() {
        try {
            const courses = await this.courseServices.getAllCourses();
            return new ResponseModel_1.ResponseModel(true, 'Course catalog fetched successfully.', courses);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to fetch course catalog.');
        }
    }
    async getEnrolled(req) {
        try {
            const studentId = req.user.sub;
            const enrollments = await this.courseServices.getEnrolledCourses(studentId);
            return new ResponseModel_1.ResponseModel(true, 'Enrolled courses fetched successfully.', enrollments);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to fetch enrolled courses.');
        }
    }
    async enroll(req, enrollCourseDto) {
        try {
            const studentId = req.user.sub;
            const enrollment = await this.courseServices.enroll(studentId, enrollCourseDto.courseId);
            return new ResponseModel_1.ResponseModel(true, 'Enrolled in course successfully.', enrollment);
        }
        catch (error) {
            if (error instanceof CourseNotFoundError_1.CourseNotFoundError) {
                throw new common_1.NotFoundException(error.message);
            }
            if (error instanceof AlreadyEnrolledError_1.AlreadyEnrolledError) {
                throw new common_1.ConflictException(error.message);
            }
            throw new common_1.InternalServerErrorException('Failed to enroll in course.');
        }
    }
    async updateProgress(req, updateProgressDto) {
        try {
            const studentId = req.user.sub;
            const enrollment = await this.courseServices.updateProgress(studentId, updateProgressDto.courseId, updateProgressDto.progress);
            return new ResponseModel_1.ResponseModel(true, 'Course progress updated successfully.', enrollment);
        }
        catch (error) {
            if (error instanceof NotEnrolledError_1.NotEnrolledError) {
                throw new common_1.BadRequestException(error.message);
            }
            throw new common_1.InternalServerErrorException('Failed to update course progress.');
        }
    }
    async delete(req, id) {
        if (req.user.role !== 'TEACHER' && req.user.role !== 'ADMIN') {
            throw new common_1.UnauthorizedException('Only teachers or administrators can delete courses.');
        }
        try {
            await this.courseServices.deleteCourse(id);
            return new ResponseModel_1.ResponseModel(true, 'Course deleted successfully.', null);
        }
        catch (error) {
            if (error instanceof CourseNotFoundError_1.CourseNotFoundError) {
                throw new common_1.NotFoundException(error.message);
            }
            throw new common_1.InternalServerErrorException('Failed to delete course.');
        }
    }
};
exports.CourseController = CourseController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(JwtAuthGuard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CreateCourseDto_1.CreateCourseDto]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('seed'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "seed", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getCatalog", null);
__decorate([
    (0, common_1.Get)('enrolled'),
    (0, common_1.UseGuards)(JwtAuthGuard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getEnrolled", null);
__decorate([
    (0, common_1.Post)('enroll'),
    (0, common_1.UseGuards)(JwtAuthGuard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, EnrollCourseDto_1.EnrollCourseDto]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "enroll", null);
__decorate([
    (0, common_1.Post)('progress'),
    (0, common_1.UseGuards)(JwtAuthGuard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, UpdateProgressDto_1.UpdateProgressDto]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "updateProgress", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(JwtAuthGuard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "delete", null);
exports.CourseController = CourseController = __decorate([
    (0, common_1.Controller)('courses'),
    (0, common_1.UseFilters)(HttpExceptionFilter_1.HttpExceptionFilter),
    __metadata("design:paramtypes", [CourseServices_1.CourseServices])
], CourseController);
//# sourceMappingURL=CourseController.js.map