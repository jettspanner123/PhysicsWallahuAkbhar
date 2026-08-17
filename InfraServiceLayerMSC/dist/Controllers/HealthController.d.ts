import { ResponseModel } from '../Models/ResponseModel';
import { HealthStatusModel } from '../Models/HealthStatusModel';
import { HealthCheckLogServices } from '../Services/HealthCheckLogServices';
export declare class HealthController {
    private readonly healthCheckLogServices;
    constructor(healthCheckLogServices: HealthCheckLogServices);
    checkHealth(ip: string): Promise<ResponseModel<HealthStatusModel>>;
}
