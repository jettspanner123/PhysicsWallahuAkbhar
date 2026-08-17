import { QuizRepository } from '../Repositories/QuizRepository';
import { CourseRepository } from '../Repositories/CourseRepository';
export declare class QuizServices {
    private readonly quizRepository;
    private readonly courseRepository;
    constructor(quizRepository: QuizRepository, courseRepository: CourseRepository);
    createQuiz(courseId: string, moduleName: string, title: string, questions: any[]): Promise<any>;
    getQuizzesByCourse(courseId: string): Promise<any[]>;
    getQuizById(id: string): Promise<any>;
    submitAttempt(quizId: string, studentId: string, answers: number[]): Promise<any>;
    getStudentAttempts(studentId: string): Promise<any[]>;
    getStudentAttemptsByQuiz(studentId: string, quizId: string): Promise<any[]>;
    seedDefaultQuizzes(): Promise<{
        count: number;
    }>;
}
