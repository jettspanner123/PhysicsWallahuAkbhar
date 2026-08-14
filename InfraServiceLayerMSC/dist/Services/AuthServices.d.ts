import { JwtService } from '@nestjs/jwt';
import { UserServices } from './UserServices';
import { AuthResponseModel } from '../Models/AuthResponseModel';
export declare class AuthServices {
    private readonly userServices;
    private readonly jwtService;
    private readonly emailRegex;
    constructor(userServices: UserServices, jwtService: JwtService);
    register(name: string, email: string, password: string, confirmPassword: string, role: string): Promise<AuthResponseModel>;
    login(email: string, password: string): Promise<AuthResponseModel>;
    private generateToken;
}
