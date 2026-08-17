import { Injectable } from '@nestjs/common';
import { DatabaseProvider } from '../Providers/DatabaseProvider';

@Injectable()
export class AssignmentRepository {
    private readonly databaseProvider: DatabaseProvider;

    public constructor(databaseProvider: DatabaseProvider) {
        this.databaseProvider = databaseProvider;
    }

    public async create(courseId: string, title: string, description: string, dueDate: Date): Promise<any> {
        return this.databaseProvider.assignmentModel.create({
            data: {
                title,
                description,
                dueDate,
                courseId,
            }
        });
    }

    public async findByCourse(courseId: string): Promise<any[]> {
        return this.databaseProvider.assignmentModel.findMany({
            where: {
                courseId,
            },
            orderBy: {
                dueDate: 'asc',
            }
        });
    }

    public async findById(id: string): Promise<any | null> {
        return this.databaseProvider.assignmentModel.findUnique({
            where: {
                id,
            }
        });
    }

    public async delete(id: string): Promise<any> {
        return this.databaseProvider.assignmentModel.delete({
            where: {
                id,
            }
        });
    }
}
