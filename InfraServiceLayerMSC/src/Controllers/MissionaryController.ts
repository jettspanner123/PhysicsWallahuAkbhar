import {
    Controller,
    Get,
    Post,
    Body,
    Request,
    HttpCode,
    HttpStatus,
    UseGuards,
    UseFilters,
    InternalServerErrorException,
    BadRequestException,
    UnauthorizedException,
} from '@nestjs/common';
import { MissionaryServices } from '../Services/MissionaryServices';
import { CreateMissionaryDto } from '../Models/CreateMissionaryDto';
import { ResponseModel } from '../Models/ResponseModel';
import { HttpExceptionFilter } from '../Filters/HttpExceptionFilter';
import { JwtAuthGuard } from '../Guards/JwtAuthGuard';

@Controller('missionaries')
@UseFilters(HttpExceptionFilter)
export class MissionaryController {

    private readonly missionaryServices: MissionaryServices;

    public constructor(missionaryServices: MissionaryServices) {
        this.missionaryServices = missionaryServices;
    }

    @Post('contact')
    @HttpCode(HttpStatus.CREATED)
    public async createContact(
        @Body() createMissionaryDto: CreateMissionaryDto
    ): Promise<ResponseModel<any>> {
        if (!createMissionaryDto.fullName || !createMissionaryDto.email || !createMissionaryDto.subject || !createMissionaryDto.message) {
            throw new BadRequestException('Full name, email, subject, and message are required.');
        }
        try {
            const result: any = await this.missionaryServices.createContactMessage(
                createMissionaryDto.fullName,
                createMissionaryDto.email,
                createMissionaryDto.subject,
                createMissionaryDto.message
            );
            return new ResponseModel<any>(
                true,
                'Contact message stored successfully.',
                result
            );
        } catch (error: unknown) {
            throw new InternalServerErrorException('Failed to store contact message.');
        }
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    public async getContactMessages(@Request() req: any): Promise<ResponseModel<any[]>> {
        if (req.user.role !== 'TEACHER' && req.user.role !== 'ADMIN') {
            throw new UnauthorizedException('Only teachers or administrators can view contact messages.');
        }
        try {
            const messages = await this.missionaryServices.getAllContactMessages();
            return new ResponseModel<any[]>(
                true,
                'Contact messages fetched successfully.',
                messages
            );
        } catch (error: unknown) {
            throw new InternalServerErrorException('Failed to fetch contact messages.');
        }
    }
}
