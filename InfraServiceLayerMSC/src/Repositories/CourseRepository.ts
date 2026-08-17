import { Injectable } from '@nestjs/common';
import { DatabaseProvider } from '../Providers/DatabaseProvider';

@Injectable()
export class CourseRepository {

    private readonly databaseProvider: DatabaseProvider;

    public constructor(databaseProvider: DatabaseProvider) {
        this.databaseProvider = databaseProvider;
    }

    public async findAll(): Promise<any[]> {
        return this.databaseProvider.courseModel.findMany();
    }

    public async findById(id: string): Promise<any | null> {
        return this.databaseProvider.courseModel.findUnique({
            where: { id: id },
        });
    }

    public async findEnrolled(studentId: string): Promise<any[]> {
        return this.databaseProvider.enrollmentModel.findMany({
            where: { studentId: studentId },
            include: {
                course: true,
            },
        });
    }

    public async findEnrollment(studentId: string, courseId: string): Promise<any | null> {
        return this.databaseProvider.enrollmentModel.findUnique({
            where: {
                studentId_courseId: {
                    studentId: studentId,
                    courseId: courseId,
                },
            },
        });
    }

    public async enroll(studentId: string, courseId: string): Promise<any> {
        return this.databaseProvider.enrollmentModel.create({
            data: {
                studentId: studentId,
                courseId: courseId,
                progress: 0,
            },
        });
    }

    public async updateProgress(studentId: string, courseId: string, progress: number): Promise<any> {
        return this.databaseProvider.enrollmentModel.update({
            where: {
                studentId_courseId: {
                    studentId: studentId,
                    courseId: courseId,
                },
            },
            data: {
                progress: progress,
            },
        });
    }

    public async createMany(coursesData: any[]): Promise<void> {
        await this.databaseProvider.courseModel.createMany({
            data: coursesData,
        });
    }

    public async create(courseData: any): Promise<any> {
        return this.databaseProvider.courseModel.create({
            data: courseData,
        });
    }

    public async delete(id: string): Promise<any> {
        return this.databaseProvider.courseModel.delete({
            where: { id: id },
        });
    }
}
