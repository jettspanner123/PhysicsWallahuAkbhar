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
    BadRequestException,
    ConflictException,
    NotFoundException,
    InternalServerErrorException,
    UnauthorizedException,
} from '@nestjs/common';
import { CourseServices } from '../Services/CourseServices';
import { ResponseModel } from '../Models/ResponseModel';
import { EnrollCourseDto } from '../Models/EnrollCourseDto';
import { UpdateProgressDto } from '../Models/UpdateProgressDto';
import { CreateCourseDto } from '../Models/CreateCourseDto';
import { JwtAuthGuard } from '../Guards/JwtAuthGuard';
import { HttpExceptionFilter } from '../Filters/HttpExceptionFilter';
import { CourseNotFoundError } from '../Errors/CourseNotFoundError';
import { AlreadyEnrolledError } from '../Errors/AlreadyEnrolledError';
import { NotEnrolledError } from '../Errors/NotEnrolledError';

@Controller('courses')
@UseFilters(HttpExceptionFilter)
export class CourseController {

    private readonly courseServices: CourseServices;

    public constructor(courseServices: CourseServices) {
        this.courseServices = courseServices;
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.CREATED)
    public async create(
        @Request() req: any,
        @Body() createCourseDto: CreateCourseDto
    ): Promise<ResponseModel<any>> {
        if (req.user.role !== 'TEACHER' && req.user.role !== 'ADMIN') {
            throw new UnauthorizedException('Only teachers or administrators can create courses.');
        }
        try {
            const course: any = await this.courseServices.createCourse(req.user.sub, createCourseDto);
            return new ResponseModel<any>(
                true,
                'Course created successfully.',
                course
            );
        } catch (error: unknown) {
            throw new InternalServerErrorException('Failed to create course.');
        }
    }

    @Post('seed')
    @HttpCode(HttpStatus.OK)
    public async seed(): Promise<ResponseModel<{ count: number }>> {
        try {
            const count: number = await this.courseServices.seedCourses();
            return new ResponseModel<{ count: number }>(
                true,
                'Database seeded with default courses successfully.',
                { count: count }
            );
        } catch (error: unknown) {
            throw new InternalServerErrorException('Failed to seed database with courses.');
        }
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    public async getCatalog(): Promise<ResponseModel<any[]>> {
        try {
            const courses: any[] = await this.courseServices.getAllCourses();
            return new ResponseModel<any[]>(
                true,
                'Course catalog fetched successfully.',
                courses
            );
        } catch (error: unknown) {
            throw new InternalServerErrorException('Failed to fetch course catalog.');
        }
    }

    @Get('enrolled')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    public async getEnrolled(@Request() req: any): Promise<ResponseModel<any[]>> {
        try {
            const studentId: string = req.user.sub;
            const enrollments: any[] = await this.courseServices.getEnrolledCourses(studentId);
            return new ResponseModel<any[]>(
                true,
                'Enrolled courses fetched successfully.',
                enrollments
            );
        } catch (error: unknown) {
            throw new InternalServerErrorException('Failed to fetch enrolled courses.');
        }
    }

    @Post('enroll')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.CREATED)
    public async enroll(
        @Request() req: any,
        @Body() enrollCourseDto: EnrollCourseDto
    ): Promise<ResponseModel<any>> {
        try {
            const studentId: string = req.user.sub;
            const enrollment: any = await this.courseServices.enroll(studentId, enrollCourseDto.courseId);
            return new ResponseModel<any>(
                true,
                'Enrolled in course successfully.',
                enrollment
            );
        } catch (error: unknown) {
            if (error instanceof CourseNotFoundError) {
                throw new NotFoundException(error.message);
            }
            if (error instanceof AlreadyEnrolledError) {
                throw new ConflictException(error.message);
            }
            throw new InternalServerErrorException('Failed to enroll in course.');
        }
    }

    @Post('progress')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    public async updateProgress(
        @Request() req: any,
        @Body() updateProgressDto: UpdateProgressDto
    ): Promise<ResponseModel<any>> {
        try {
            const studentId: string = req.user.sub;
            const enrollment: any = await this.courseServices.updateProgress(
                studentId,
                updateProgressDto.courseId,
                updateProgressDto.progress
            );
            return new ResponseModel<any>(
                true,
                'Course progress updated successfully.',
                enrollment
            );
        } catch (error: unknown) {
            if (error instanceof NotEnrolledError) {
                throw new BadRequestException(error.message);
            }
            throw new InternalServerErrorException('Failed to update course progress.');
        }
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    public async delete(
        @Request() req: any,
        @Param('id') id: string
    ): Promise<ResponseModel<any>> {
        if (req.user.role !== 'TEACHER' && req.user.role !== 'ADMIN') {
            throw new UnauthorizedException('Only teachers or administrators can delete courses.');
        }
        try {
            await this.courseServices.deleteCourse(id);
            return new ResponseModel<any>(
                true,
                'Course deleted successfully.',
                null
            );
        } catch (error: unknown) {
            if (error instanceof CourseNotFoundError) {
                throw new NotFoundException(error.message);
            }
            throw new InternalServerErrorException('Failed to delete course.');
        }
    }
}
