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
exports.MissionaryController = void 0;
const common_1 = require("@nestjs/common");
const MissionaryServices_1 = require("../Services/MissionaryServices");
const CreateMissionaryDto_1 = require("../Models/CreateMissionaryDto");
const ResponseModel_1 = require("../Models/ResponseModel");
const HttpExceptionFilter_1 = require("../Filters/HttpExceptionFilter");
let MissionaryController = class MissionaryController {
    missionaryServices;
    constructor(missionaryServices) {
        this.missionaryServices = missionaryServices;
    }
    async createContact(createMissionaryDto) {
        if (!createMissionaryDto.fullName || !createMissionaryDto.email || !createMissionaryDto.subject || !createMissionaryDto.message) {
            throw new common_1.BadRequestException('Full name, email, subject, and message are required.');
        }
        try {
            const result = await this.missionaryServices.createContactMessage(createMissionaryDto.fullName, createMissionaryDto.email, createMissionaryDto.subject, createMissionaryDto.message);
            return new ResponseModel_1.ResponseModel(true, 'Contact message stored successfully.', result);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to store contact message.');
        }
    }
};
exports.MissionaryController = MissionaryController;
__decorate([
    (0, common_1.Post)('contact'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateMissionaryDto_1.CreateMissionaryDto]),
    __metadata("design:returntype", Promise)
], MissionaryController.prototype, "createContact", null);
exports.MissionaryController = MissionaryController = __decorate([
    (0, common_1.Controller)('missionaries'),
    (0, common_1.UseFilters)(HttpExceptionFilter_1.HttpExceptionFilter),
    __metadata("design:paramtypes", [MissionaryServices_1.MissionaryServices])
], MissionaryController);
//# sourceMappingURL=MissionaryController.js.map