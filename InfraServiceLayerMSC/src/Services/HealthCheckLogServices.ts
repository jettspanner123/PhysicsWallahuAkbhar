import { Injectable } from '@nestjs/common';
import { HealthCheckLogRepository } from '../Repositories/HealthCheckLogRepository';

@Injectable()
export class HealthCheckLogServices {

    private readonly healthCheckLogRepository: HealthCheckLogRepository;

    public constructor(healthCheckLogRepository: HealthCheckLogRepository) {
        this.healthCheckLogRepository = healthCheckLogRepository;
    }

    public async logHealthCheck(status: string, ip: string | null): Promise<void> {
        await this.healthCheckLogRepository.create(status, ip);
    }
}
