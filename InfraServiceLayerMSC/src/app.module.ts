import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from './Controllers/UserController';
import { AuthController } from './Controllers/AuthController';
import { DatabaseProvider } from './Providers/DatabaseProvider';
import { UserRepository } from './Repositories/UserRepository';
import { UserServices } from './Services/UserServices';
import { AuthServices } from './Services/AuthServices';
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
    ],
    providers: [
        DatabaseProvider,
        UserRepository,
        UserServices,
        AuthServices,
        PasswordServices,
    ],
})
export class AppModule {}
