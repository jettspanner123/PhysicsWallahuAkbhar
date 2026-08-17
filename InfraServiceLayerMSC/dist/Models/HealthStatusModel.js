"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthStatusModel = void 0;
class HealthStatusModel {
    status;
    timestamp;
    uptimeSeconds;
    constructor(status, timestamp, uptimeSeconds) {
        this.status = status;
        this.timestamp = timestamp;
        this.uptimeSeconds = uptimeSeconds;
    }
}
exports.HealthStatusModel = HealthStatusModel;
//# sourceMappingURL=HealthStatusModel.js.map