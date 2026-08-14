import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserServices } from './UserServices';
import { UserModel } from '../Models/UserModel';
import { AuthResponseModel } from '../Models/AuthResponseModel';
import { PasswordsDoNotMatchError } from '../Errors/PasswordsDoNotMatchError';
import { InvalidEmailError } from '../Errors/InvalidEmailError';

@Injectable()
export class AuthServices {

    private readonly userServices: UserServices;
    private readonly jwtService: JwtService;
    private readonly emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    public constructor(
        userServices: UserServices,
        jwtService: JwtService
    ) {
        this.userServices = userServices;
        this.jwtService = jwtService;
    }

    public async register(
        name: string,
        email: string,
        password: string,
        confirmPassword: string,
        role: string
    ): Promise<AuthResponseModel> {
        if (this.emailRegex.test(email) === false) {
            throw new InvalidEmailError(email);
        }

        if (password !== confirmPassword) {
            throw new PasswordsDoNotMatchError();
        }

        const user: UserModel = await this.userServices.signup(email, password, name, role);
        const token: string = this.generateToken(user);

        return new AuthResponseModel(user, token);
    }

    public async login(
        email: string,
        password: string
    ): Promise<AuthResponseModel> {
        if (this.emailRegex.test(email) === false) {
            throw new InvalidEmailError(email);
        }

        const user: UserModel = await this.userServices.login(email, password);
        const token: string = this.generateToken(user);

        return new AuthResponseModel(user, token);
    }

    private generateToken(user: UserModel): string {
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
        };
        return this.jwtService.sign(payload);
    }
}
