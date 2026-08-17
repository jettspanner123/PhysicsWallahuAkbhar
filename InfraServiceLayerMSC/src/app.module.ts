import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from './Controllers/UserController';
import { AuthController } from './Controllers/AuthController';
import { HealthController } from './Controllers/HealthController';
import { CourseController } from './Controllers/CourseController';
import { MissionaryController } from './Controllers/MissionaryController';
import { DatabaseProvider } from './Providers/DatabaseProvider';
import { UserRepository } from './Repositories/UserRepository';
import { HealthCheckLogRepository } from './Repositories/HealthCheckLogRepository';
import { CourseRepository } from './Repositories/CourseRepository';
import { MissionaryRepository } from './Repositories/MissionaryRepository';
import { UserServices } from './Services/UserServices';
import { AuthServices } from './Services/AuthServices';
import { HealthCheckLogServices } from './Services/HealthCheckLogServices';
import { CourseServices } from './Services/CourseServices';
import { MissionaryServices } from './Services/MissionaryServices';
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
        CourseController,
        MissionaryController,
    ],
    providers: [
        DatabaseProvider,
        UserRepository,
        HealthCheckLogRepository,
        CourseRepository,
        MissionaryRepository,
        UserServices,
        AuthServices,
        HealthCheckLogServices,
        CourseServices,
        MissionaryServices,
        PasswordServices,
    ],
})
export class AppModule {}
