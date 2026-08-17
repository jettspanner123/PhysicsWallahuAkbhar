import { DatabaseProvider } from '../Providers/DatabaseProvider';
export declare class AssignmentRepository {
    private readonly databaseProvider;
    constructor(databaseProvider: DatabaseProvider);
    create(courseId: string, title: string, description: string, dueDate: Date): Promise<any>;
    findByCourse(courseId: string): Promise<any[]>;
    findById(id: string): Promise<any | null>;
    delete(id: string): Promise<any>;
}
