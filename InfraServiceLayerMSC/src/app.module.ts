import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from './Controllers/UserController';
import { AuthController } from './Controllers/AuthController';
import { HealthController } from './Controllers/HealthController';
import { DatabaseProvider } from './Providers/DatabaseProvider';
import { UserRepository } from './Repositories/UserRepository';
import { HealthCheckLogRepository } from './Repositories/HealthCheckLogRepository';
import { UserServices } from './Services/UserServices';
import { AuthServices } from './Services/AuthServices';
import { HealthCheckLogServices } from './Services/HealthCheckLogServices';
import { PasswordServices } from './Services/PasswordServices';
import { AuthenticationConstants } from './Constants/AuthenticationConstants';

@Module({
    imports: [
        JwtModule.register({
            secret: AuthenticationConstants.JWT_SECRET,
            signOptions: {
                expiresIn: AuthenticationConstants.JWT_EXPIRES_IN_SECONDS,
            },
        }),
    ],
    controllers: [
        UserController,
        AuthController,
        HealthController,
    ],
    providers: [
        DatabaseProvider,
        UserRepository,
        HealthCheckLogRepository,
        UserServices,
        AuthServices,
        HealthCheckLogServices,
        PasswordServices,
    ],
})
export class AppModule {}
