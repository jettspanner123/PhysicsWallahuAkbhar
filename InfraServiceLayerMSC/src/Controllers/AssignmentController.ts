import {
    Controller,
    Get,
    Post,
    Delete,
    Body,
    Param,
    Request,
    HttpCode,
    HttpStatus,
    UseGuards,
    UseFilters,
    UnauthorizedException,
} from '@nestjs/common';
import { AssignmentServices } from '../Services/AssignmentServices';
import { CreateAssignmentDto } from '../Models/CreateAssignmentDto';
import { ResponseModel } from '../Models/ResponseModel';
import { HttpExceptionFilter } from '../Filters/HttpExceptionFilter';
import { JwtAuthGuard } from '../Guards/JwtAuthGuard';

@Controller('assignments')
@UseFilters(HttpExceptionFilter)
export class AssignmentController {
    private readonly assignmentServices: AssignmentServices;

    public constructor(assignmentServices: AssignmentServices) {
        this.assignmentServices = assignmentServices;
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.CREATED)
    public async create(
        @Request() req: any,
        @Body() createAssignmentDto: CreateAssignmentDto
    ): Promise<ResponseModel<any>> {
        const { role } = req.user;
        if (role !== 'TEACHER' && role !== 'ADMIN') {
            throw new UnauthorizedException('Only instructors can publish new assignments.');
        }

        const assignment = await this.assignmentServices.createAssignment(
            createAssignmentDto.courseId,
            createAssignmentDto.title,
            createAssignmentDto.description,
            new Date(createAssignmentDto.dueDate)
        );

        return new ResponseModel(true, 'Assignment published successfully.', assignment);
    }

    @Get('course/:courseId')
    @UseGuards(JwtAuthGuard)
    public async getByCourse(
        @Param('courseId') courseId: string
    ): Promise<ResponseModel<any[]>> {
        const assignments = await this.assignmentServices.getAssignmentsByCourse(courseId);
        return new ResponseModel(true, 'Assignments fetched successfully.', assignments);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    public async getById(
        @Param('id') id: string
    ): Promise<ResponseModel<any>> {
        const assignment = await this.assignmentServices.getAssignmentById(id);
        return new ResponseModel(true, 'Assignment fetched successfully.', assignment);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    public async delete(
        @Request() req: any,
        @Param('id') id: string
    ): Promise<ResponseModel<void>> {
        const { role } = req.user;
        if (role !== 'TEACHER' && role !== 'ADMIN') {
            throw new UnauthorizedException('Only instructors can delete assignments.');
        }

        await this.assignmentServices.deleteAssignment(id);

        return new ResponseModel(true, 'Assignment deleted successfully.', undefined);
    }
}
