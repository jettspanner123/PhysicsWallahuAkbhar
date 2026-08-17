import { Injectable, NotFoundException } from '@nestjs/common';
import { AssignmentRepository } from '../Repositories/AssignmentRepository';

@Injectable()
export class AssignmentServices {
    private readonly assignmentRepository: AssignmentRepository;

    public constructor(assignmentRepository: AssignmentRepository) {
        this.assignmentRepository = assignmentRepository;
    }

    public async createAssignment(courseId: string, title: string, description: string, dueDate: Date): Promise<any> {
        return this.assignmentRepository.create(courseId, title, description, dueDate);
    }

    public async getAssignmentsByCourse(courseId: string): Promise<any[]> {
        return this.assignmentRepository.findByCourse(courseId);
    }

    public async getAssignmentById(id: string): Promise<any> {
        const assignment = await this.assignmentRepository.findById(id);
        if (assignment === null) {
            throw new NotFoundException(`Assignment with ID ${id} not found.`);
        }
        return assignment;
    }

    public async deleteAssignment(id: string): Promise<void> {
        await this.getAssignmentById(id);
        await this.assignmentRepository.delete(id);
    }
}
