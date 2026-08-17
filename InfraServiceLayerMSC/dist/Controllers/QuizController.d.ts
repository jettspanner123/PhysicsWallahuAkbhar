import { QuizServices } from '../Services/QuizServices';
import { CreateQuizDto } from '../Models/CreateQuizDto';
import { SubmitAttemptDto } from '../Models/SubmitAttemptDto';
import { ResponseModel } from '../Models/ResponseModel';
export declare class QuizController {
    private readonly quizServices;
    constructor(quizServices: QuizServices);
    create(req: any, createQuizDto: CreateQuizDto): Promise<ResponseModel<any>>;
    seed(req: any): Promise<ResponseModel<{
        count: number;
    }>>;
    getByCourse(courseId: string): Promise<ResponseModel<any[]>>;
    getMyAttempts(req: any): Promise<ResponseModel<any[]>>;
    getById(id: string): Promise<ResponseModel<any>>;
    submitAttempt(req: any, id: string, submitAttemptDto: SubmitAttemptDto): Promise<ResponseModel<any>>;
}
