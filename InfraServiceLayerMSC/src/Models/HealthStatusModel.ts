export class HealthStatusModel {

    public readonly status: string;
    public readonly timestamp: string;
    public readonly uptimeSeconds: number;

    public constructor(status: string, timestamp: string, uptimeSeconds: number) {
        this.status = status;
        this.timestamp = timestamp;
        this.uptimeSeconds = uptimeSeconds;
    }
}
