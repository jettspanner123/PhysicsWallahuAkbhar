import { Controller, Get, HttpCode, HttpStatus, Ip, UseFilters } from '@nestjs/common';
import { ResponseModel } from '../Models/ResponseModel';
import { HealthStatusModel } from '../Models/HealthStatusModel';
import { HealthCheckLogServices } from '../Services/HealthCheckLogServices';
import { HttpExceptionFilter } from '../Filters/HttpExceptionFilter';

@Controller('health')
@UseFilters(HttpExceptionFilter)
export class HealthController {

    private readonly healthCheckLogServices: HealthCheckLogServices;

    public constructor(healthCheckLogServices: HealthCheckLogServices) {
        this.healthCheckLogServices = healthCheckLogServices;
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    public async checkHealth(@Ip() ip: string): Promise<ResponseModel<HealthStatusModel>> {
        const status: string = 'OK';
        const timestamp: string = new Date().toISOString();
        const uptimeSeconds: number = Math.floor(process.uptime());

        await this.healthCheckLogServices.logHealthCheck(status, ip);

        const data: HealthStatusModel = new HealthStatusModel(status, timestamp, uptimeSeconds);

        return new ResponseModel<HealthStatusModel>(
            true,
            'Health check passed and logged successfully.',
            data
        );
    }
}
