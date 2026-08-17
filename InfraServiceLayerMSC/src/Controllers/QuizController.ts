import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Request,
    HttpCode,
    HttpStatus,
    UseGuards,
    UseFilters,
    InternalServerErrorException,
    BadRequestException,
    UnauthorizedException,
    NotFoundException,
} from '@nestjs/common';
import { QuizServices } from '../Services/QuizServices';
import { CreateQuizDto } from '../Models/CreateQuizDto';
import { SubmitAttemptDto } from '../Models/SubmitAttemptDto';
import { ResponseModel } from '../Models/ResponseModel';
import { HttpExceptionFilter } from '../Filters/HttpExceptionFilter';
import { JwtAuthGuard } from '../Guards/JwtAuthGuard';

@Controller('quizzes')
@UseFilters(HttpExceptionFilter)
export class QuizController {

    private readonly quizServices: QuizServices;

    public constructor(quizServices: QuizServices) {
        this.quizServices = quizServices;
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.CREATED)
    public async create(
        @Request() req: any,
        @Body() createQuizDto: CreateQuizDto
    ): Promise<ResponseModel<any>> {
        if (req.user.role !== 'TEACHER' && req.user.role !== 'ADMIN') {
            throw new UnauthorizedException('Only teachers or administrators can create quizzes.');
        }
        if (!createQuizDto.title || !createQuizDto.courseId || !createQuizDto.moduleName || !createQuizDto.questions || createQuizDto.questions.length === 0) {
            throw new BadRequestException('Title, course ID, module name, and questions list are required.');
        }
        try {
            const quiz = await this.quizServices.createQuiz(
                createQuizDto.courseId,
                createQuizDto.moduleName,
                createQuizDto.title,
                createQuizDto.questions
            );
            return new ResponseModel<any>(
                true,
                'Quiz created successfully.',
                quiz
            );
        } catch (error: unknown) {
            throw new InternalServerErrorException('Failed to create quiz.');
        }
    }

    @Post('seed')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    public async seed(@Request() req: any): Promise<ResponseModel<{ count: number }>> {
        if (req.user.role !== 'TEACHER' && req.user.role !== 'ADMIN') {
            throw new UnauthorizedException('Only teachers or administrators can seed default quizzes.');
        }
        try {
            const result = await this.quizServices.seedDefaultQuizzes();
            return new ResponseModel<{ count: number }>(
                true,
                'Default quizzes seeded successfully.',
                result
            );
        } catch (error: unknown) {
            throw new InternalServerErrorException('Failed to seed default quizzes.');
        }
    }

    @Get('course/:courseId')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    public async getByCourse(
        @Param('courseId') courseId: string
    ): Promise<ResponseModel<any[]>> {
        try {
            const quizzes = await this.quizServices.getQuizzesByCourse(courseId);
            return new ResponseModel<any[]>(
                true,
                'Quizzes retrieved successfully.',
                quizzes
            );
        } catch (error: unknown) {
            throw new InternalServerErrorException('Failed to retrieve quizzes.');
        }
    }

    @Get('attempts/my')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    public async getMyAttempts(
        @Request() req: any
    ): Promise<ResponseModel<any[]>> {
        try {
            const studentId = req.user.sub;
            const attempts = await this.quizServices.getStudentAttempts(studentId);
            return new ResponseModel<any[]>(
                true,
                'My quiz attempts retrieved successfully.',
                attempts
            );
        } catch (error: unknown) {
            throw new InternalServerErrorException('Failed to retrieve attempts.');
        }
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    public async getById(
        @Param('id') id: string
    ): Promise<ResponseModel<any>> {
        try {
            const quiz = await this.quizServices.getQuizById(id);
            return new ResponseModel<any>(
                true,
                'Quiz retrieved successfully.',
                quiz
            );
        } catch (error: unknown) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('Failed to retrieve quiz.');
        }
    }

    @Post(':id/attempt')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.CREATED)
    public async submitAttempt(
        @Request() req: any,
        @Param('id') id: string,
        @Body() submitAttemptDto: SubmitAttemptDto
    ): Promise<ResponseModel<any>> {
        const studentId = req.user.sub;
        if (!submitAttemptDto.answers || submitAttemptDto.answers.length === 0) {
            throw new BadRequestException('Answers array is required.');
        }
        try {
            const attempt = await this.quizServices.submitAttempt(
                id,
                studentId,
                submitAttemptDto.answers
            );
            return new ResponseModel<any>(
                true,
                'Quiz attempt submitted successfully.',
                attempt
            );
        } catch (error: unknown) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('Failed to submit quiz attempt.');
        }
    }
}
