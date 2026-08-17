import { HealthCheckLogRepository } from '../Repositories/HealthCheckLogRepository';
export declare class HealthCheckLogServices {
    private readonly healthCheckLogRepository;
    constructor(healthCheckLogRepository: HealthCheckLogRepository);
    logHealthCheck(status: string, ip: string | null): Promise<void>;
}
