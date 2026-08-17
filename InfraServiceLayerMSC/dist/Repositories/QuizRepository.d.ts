import { DatabaseProvider } from '../Providers/DatabaseProvider';
export declare class QuizRepository {
    private readonly databaseProvider;
    constructor(databaseProvider: DatabaseProvider);
    create(courseId: string, moduleName: string, title: string, questions: any[]): Promise<any>;
    findAll(): Promise<any[]>;
    findByCourseId(courseId: string): Promise<any[]>;
    findById(id: string): Promise<any | null>;
    createAttempt(quizId: string, studentId: string, score: number, answers: number[]): Promise<any>;
    findAttemptsByStudentId(studentId: string): Promise<any[]>;
    findAttemptsByStudentAndQuiz(studentId: string, quizId: string): Promise<any[]>;
}
