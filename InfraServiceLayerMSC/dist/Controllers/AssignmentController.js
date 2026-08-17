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
exports.AssignmentController = void 0;
const common_1 = require("@nestjs/common");
const AssignmentServices_1 = require("../Services/AssignmentServices");
const CreateAssignmentDto_1 = require("../Models/CreateAssignmentDto");
const ResponseModel_1 = require("../Models/ResponseModel");
const HttpExceptionFilter_1 = require("../Filters/HttpExceptionFilter");
const JwtAuthGuard_1 = require("../Guards/JwtAuthGuard");
let AssignmentController = class AssignmentController {
    assignmentServices;
    constructor(assignmentServices) {
        this.assignmentServices = assignmentServices;
    }
    async create(req, createAssignmentDto) {
        const { role } = req.user;
        if (role !== 'TEACHER' && role !== 'ADMIN') {
            throw new common_1.UnauthorizedException('Only instructors can publish new assignments.');
        }
        const assignment = await this.assignmentServices.createAssignment(createAssignmentDto.courseId, createAssignmentDto.title, createAssignmentDto.description, new Date(createAssignmentDto.dueDate));
        return new ResponseModel_1.ResponseModel(true, 'Assignment published successfully.', assignment);
    }
    async getByCourse(courseId) {
        const assignments = await this.assignmentServices.getAssignmentsByCourse(courseId);
        return new ResponseModel_1.ResponseModel(true, 'Assignments fetched successfully.', assignments);
    }
    async getById(id) {
        const assignment = await this.assignmentServices.getAssignmentById(id);
        return new ResponseModel_1.ResponseModel(true, 'Assignment fetched successfully.', assignment);
    }
    async delete(req, id) {
        const { role } = req.user;
        if (role !== 'TEACHER' && role !== 'ADMIN') {
            throw new common_1.UnauthorizedException('Only instructors can delete assignments.');
        }
        await this.assignmentServices.deleteAssignment(id);
        return new ResponseModel_1.ResponseModel(true, 'Assignment deleted successfully.', undefined);
    }
};
exports.AssignmentController = AssignmentController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(JwtAuthGuard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CreateAssignmentDto_1.CreateAssignmentDto]),
    __metadata("design:returntype", Promise)
], AssignmentController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('course/:courseId'),
    (0, common_1.UseGuards)(JwtAuthGuard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AssignmentController.prototype, "getByCourse", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(JwtAuthGuard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AssignmentController.prototype, "getById", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(JwtAuthGuard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AssignmentController.prototype, "delete", null);
exports.AssignmentController = AssignmentController = __decorate([
    (0, common_1.Controller)('assignments'),
    (0, common_1.UseFilters)(HttpExceptionFilter_1.HttpExceptionFilter),
    __metadata("design:paramtypes", [AssignmentServices_1.AssignmentServices])
], AssignmentController);
//# sourceMappingURL=AssignmentController.js.map