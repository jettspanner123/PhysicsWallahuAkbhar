import { DatabaseProvider } from '../Providers/DatabaseProvider';
export declare class HealthCheckLogRepository {
    private readonly databaseProvider;
    constructor(databaseProvider: DatabaseProvider);
    create(status: string, ip: string | null): Promise<void>;
}
