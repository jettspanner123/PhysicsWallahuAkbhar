import { DatabaseProvider } from '../Providers/DatabaseProvider';
export declare class MissionaryRepository {
    private readonly databaseProvider;
    constructor(databaseProvider: DatabaseProvider);
    create(fullName: string, email: string, subject: string, message: string): Promise<any>;
}
