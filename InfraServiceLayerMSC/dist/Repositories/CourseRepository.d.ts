import { DatabaseProvider } from '../Providers/DatabaseProvider';
export declare class CourseRepository {
    private readonly databaseProvider;
    constructor(databaseProvider: DatabaseProvider);
    findAll(): Promise<any[]>;
    findById(id: string): Promise<any | null>;
    findEnrolled(studentId: string): Promise<any[]>;
    findEnrollment(studentId: string, courseId: string): Promise<any | null>;
    enroll(studentId: string, courseId: string): Promise<any>;
    updateProgress(studentId: string, courseId: string, progress: number): Promise<any>;
    createMany(coursesData: any[]): Promise<void>;
    create(courseData: any): Promise<any>;
    delete(id: string): Promise<any>;
}
