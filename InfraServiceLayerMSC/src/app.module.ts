import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from './Controllers/UserController';
import { AuthController } from './Controllers/AuthController';
import { HealthController } from './Controllers/HealthController';
import { CourseController } from './Controllers/CourseController';
import { MissionaryController } from './Controllers/MissionaryController';
import { QuizController } from './Controllers/QuizController';
import { AssignmentController } from './Controllers/AssignmentController';
import { DatabaseProvider } from './Providers/DatabaseProvider';
import { UserRepository } from './Repositories/UserRepository';
import { HealthCheckLogRepository } from './Repositories/HealthCheckLogRepository';
import { CourseRepository } from './Repositories/CourseRepository';
import { MissionaryRepository } from './Repositories/MissionaryRepository';
import { QuizRepository } from './Repositories/QuizRepository';
import { AssignmentRepository } from './Repositories/AssignmentRepository';
import { UserServices } from './Services/UserServices';
import { AuthServices } from './Services/AuthServices';
import { HealthCheckLogServices } from './Services/HealthCheckLogServices';
import { CourseServices } from './Services/CourseServices';
import { MissionaryServices } from './Services/MissionaryServices';
import { QuizServices } from './Services/QuizServices';
import { AssignmentServices } from './Services/AssignmentServices';
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
        QuizController,
        AssignmentController,
    ],
    providers: [
        DatabaseProvider,
        UserRepository,
        HealthCheckLogRepository,
        CourseRepository,
        MissionaryRepository,
        QuizRepository,
        AssignmentRepository,
        UserServices,
        AuthServices,
        HealthCheckLogServices,
        CourseServices,
        MissionaryServices,
        QuizServices,
        AssignmentServices,
        PasswordServices,
    ],
})
export class AppModule {}
