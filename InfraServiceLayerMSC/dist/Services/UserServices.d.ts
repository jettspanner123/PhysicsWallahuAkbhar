import { UserRepository } from '../Repositories/UserRepository';
import { PasswordServices } from './PasswordServices';
import { UserModel } from '../Models/UserModel';
export declare class UserServices {
    private readonly userRepository;
    private readonly passwordServices;
    constructor(userRepository: UserRepository, passwordServices: PasswordServices);
    signup(email: string, password: string, name: string, role: string): Promise<UserModel>;
    login(email: string, password: string): Promise<UserModel>;
    getProfile(id: string): Promise<UserModel>;
    updateProfile(id: string, name: string): Promise<UserModel>;
}
