import { Injectable } from '@nestjs/common';
import { DatabaseProvider } from '../Providers/DatabaseProvider';

@Injectable()
export class HealthCheckLogRepository {

    private readonly databaseProvider: DatabaseProvider;

    public constructor(databaseProvider: DatabaseProvider) {
        this.databaseProvider = databaseProvider;
    }

    public async create(status: string, ip: string | null): Promise<void> {
        await this.databaseProvider.healthCheckLogModel.create({
            data: {
                status: status,
                ip: ip,
            },
        });
    }
}
