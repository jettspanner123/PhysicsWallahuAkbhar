import { AuthServices } from '../Services/AuthServices';
import { SignupRequestDto } from '../Models/SignupRequestDto';
import { LoginRequestDto } from '../Models/LoginRequestDto';
import { ResponseModel } from '../Models/ResponseModel';
import { AuthResponseModel } from '../Models/AuthResponseModel';
export declare class AuthController {
    private readonly authServices;
    constructor(authServices: AuthServices);
    register(signupRequestDto: SignupRequestDto): Promise<ResponseModel<AuthResponseModel>>;
    login(loginRequestDto: LoginRequestDto): Promise<ResponseModel<AuthResponseModel>>;
}
