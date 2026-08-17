import { HttpClientServices } from './HttpClientServices';
import { ResponseModel } from '../Models/ResponseModel';
import { QuizModel, QuizAttemptModel } from '../Models/QuizModel';

export class QuizServices {
    private static instance: QuizServices | null = null;
    private readonly httpClient: HttpClientServices;

    private constructor() {
        this.httpClient = HttpClientServices.getInstance();
    }

    public static getInstance(): QuizServices {
        if (QuizServices.instance === null) {
            QuizServices.instance = new QuizServices();
        }
        return QuizServices.instance;
    }

    public async createQuiz(quizData: {
        title: string;
        courseId: string;
        moduleName: string;
        questions: { text: string; options: string[]; correctOption: number }[];
    }): Promise<ResponseModel<QuizModel>> {
        return this.httpClient.post<ResponseModel<QuizModel>>('/quizzes', quizData);
    }

    public async seedQuizzes(): Promise<ResponseModel<{ count: number }>> {
        return this.httpClient.post<ResponseModel<{ count: number }>>('/quizzes/seed', {});
    }

    public async getQuizzesByCourse(courseId: string): Promise<ResponseModel<QuizModel[]>> {
        const response = await this.httpClient.get<ResponseModel<any[]>>(`/quizzes/course/${courseId}`);
        const quizzes = (response.data || []).map(q => ({
            ...q,
            questions: q.questions?.map((question: any) => ({
                ...question,
                options: typeof question.options === 'string' ? JSON.parse(question.options) : question.options
            }))
        }));
        return {
            ...response,
            data: quizzes
        };
    }

    public async getQuizById(quizId: string): Promise<ResponseModel<QuizModel>> {
        const response = await this.httpClient.get<ResponseModel<any>>(`/quizzes/${quizId}`);
        const quiz = response.data;
        if (quiz && quiz.questions) {
            quiz.questions = quiz.questions.map((question: any) => ({
                ...question,
                options: typeof question.options === 'string' ? JSON.parse(question.options) : question.options
            }));
        }
        return response;
    }

    public async submitAttempt(quizId: string, answers: number[]): Promise<ResponseModel<QuizAttemptModel>> {
        return this.httpClient.post<ResponseModel<QuizAttemptModel>>(`/quizzes/${quizId}/attempt`, { answers });
    }

    public async getMyAttempts(): Promise<ResponseModel<QuizAttemptModel[]>> {
        const response = await this.httpClient.get<ResponseModel<any[]>>('/quizzes/attempts/my');
        const attempts = (response.data || []).map(attempt => ({
            ...attempt,
            answers: typeof attempt.answers === 'string' ? JSON.parse(attempt.answers) : attempt.answers
        }));
        return {
            ...response,
            data: attempts
        };
    }
}
