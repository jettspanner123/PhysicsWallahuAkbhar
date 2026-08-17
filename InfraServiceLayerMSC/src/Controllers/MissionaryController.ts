import {
    Controller,
    Post,
    Body,
    HttpCode,
    HttpStatus,
    UseFilters,
    InternalServerErrorException,
    BadRequestException,
} from '@nestjs/common';
import { MissionaryServices } from '../Services/MissionaryServices';
import { CreateMissionaryDto } from '../Models/CreateMissionaryDto';
import { ResponseModel } from '../Models/ResponseModel';
import { HttpExceptionFilter } from '../Filters/HttpExceptionFilter';

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
}
