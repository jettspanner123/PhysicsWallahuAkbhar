import { UserServices } from '../Services/UserServices';
import { UserModel } from '../Models/UserModel';
import { SignupDto } from '../Models/SignupDto';
import { LoginDto } from '../Models/LoginDto';
import { UpdateProfileDto } from '../Models/UpdateProfileDto';
export declare class UserController {
    private readonly userServices;
    constructor(userServices: UserServices);
    signup(signupDto: SignupDto): Promise<UserModel>;
    login(loginDto: LoginDto): Promise<UserModel>;
    getProfile(id: string): Promise<UserModel>;
    updateProfile(id: string, updateProfileDto: UpdateProfileDto): Promise<UserModel>;
}
