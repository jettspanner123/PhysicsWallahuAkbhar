import { Injectable } from '@nestjs/common';
import { DatabaseProvider } from '../Providers/DatabaseProvider';

@Injectable()
export class QuizRepository {

    private readonly databaseProvider: DatabaseProvider;

    public constructor(databaseProvider: DatabaseProvider) {
        this.databaseProvider = databaseProvider;
    }

    public async create(courseId: string, moduleName: string, title: string, questions: any[]): Promise<any> {
        return this.databaseProvider.quizModel.create({
            data: {
                title: title,
                courseId: courseId,
                moduleName: moduleName,
                questions: {
                    create: questions.map(q => ({
                        text: q.text,
                        options: JSON.stringify(q.options),
                        correctOption: q.correctOption,
                        points: q.points ?? 1.0
                    }))
                }
            },
            include: {
                questions: true
            }
        });
    }

    public async findAll(): Promise<any[]> {
        return this.databaseProvider.quizModel.findMany({
            include: {
                questions: true,
                attempts: true
            }
        });
    }

    public async findByCourseId(courseId: string): Promise<any[]> {
        return this.databaseProvider.quizModel.findMany({
            where: { courseId: courseId },
            include: {
                questions: true,
                attempts: true
            }
        });
    }

    public async findById(id: string): Promise<any | null> {
        return this.databaseProvider.quizModel.findUnique({
            where: { id: id },
            include: {
                questions: true,
                attempts: true
            }
        });
    }

    public async createAttempt(quizId: string, studentId: string, score: number, answers: number[]): Promise<any> {
        return this.databaseProvider.quizAttemptModel.create({
            data: {
                quizId: quizId,
                studentId: studentId,
                score: score,
                answers: JSON.stringify(answers)
            }
        });
    }

    public async findAttemptsByStudentId(studentId: string): Promise<any[]> {
        return this.databaseProvider.quizAttemptModel.findMany({
            where: { studentId: studentId },
            include: {
                quiz: true
            }
        });
    }

    public async findAttemptsByStudentAndQuiz(studentId: string, quizId: string): Promise<any[]> {
        return this.databaseProvider.quizAttemptModel.findMany({
            where: {
                studentId: studentId,
                quizId: quizId
            },
            orderBy: {
                completedAt: 'desc'
            }
        });
    }
}
