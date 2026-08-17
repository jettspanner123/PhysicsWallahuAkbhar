import { AssignmentRepository } from '../Repositories/AssignmentRepository';
export declare class AssignmentServices {
    private readonly assignmentRepository;
    constructor(assignmentRepository: AssignmentRepository);
    createAssignment(courseId: string, title: string, description: string, dueDate: Date): Promise<any>;
    getAssignmentsByCourse(courseId: string): Promise<any[]>;
    getAssignmentById(id: string): Promise<any>;
    deleteAssignment(id: string): Promise<void>;
}
