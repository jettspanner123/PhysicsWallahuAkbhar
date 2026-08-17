import { Injectable } from '@nestjs/common';
import { DatabaseProvider } from '../Providers/DatabaseProvider';

@Injectable()
export class MissionaryRepository {

    private readonly databaseProvider: DatabaseProvider;

    public constructor(databaseProvider: DatabaseProvider) {
        this.databaseProvider = databaseProvider;
    }

    public async create(fullName: string, email: string, subject: string, message: string): Promise<any> {
        return this.databaseProvider.missionaryModel.create({
            data: {
                fullName: fullName,
                email: email,
                subject: subject,
                message: message,
            },
        });
    }

    public async findAll(): Promise<any[]> {
        return this.databaseProvider.missionaryModel.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
}
