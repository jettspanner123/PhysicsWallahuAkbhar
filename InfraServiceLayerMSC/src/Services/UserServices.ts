import { Injectable } from '@nestjs/common';
import { UserRepository } from '../Repositories/UserRepository';
import { PasswordServices } from './PasswordServices';
import { UserModel } from '../Models/UserModel';
import { EmailAlreadyExistsError } from '../Errors/EmailAlreadyExistsError';
import { InvalidCredentialsError } from '../Errors/InvalidCredentialsError';
import { UserNotFoundError } from '../Errors/UserNotFoundError';

@Injectable()
export class UserServices {

    private readonly userRepository: UserRepository;
    private readonly passwordServices: PasswordServices;

    public constructor(
        userRepository: UserRepository,
        passwordServices: PasswordServices
    ) {
        this.userRepository = userRepository;
        this.passwordServices = passwordServices;
    }

    public async signup(
        email: string,
        password: string,
        name: string,
        role: string
    ): Promise<UserModel> {
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser !== null) {
            throw new EmailAlreadyExistsError(email);
        }

        const passwordHash = await this.passwordServices.hashPassword(password);
        return this.userRepository.create(email, passwordHash, name, role);
    }

    public async login(
        email: string,
        password: string
    ): Promise<UserModel> {
        const user = await this.userRepository.findByEmail(email);
        if (user === null) {
            throw new InvalidCredentialsError();
        }

        const passwordHash = await this.userRepository.getPasswordHashByEmail(email);
        if (passwordHash === null) {
            throw new InvalidCredentialsError();
        }

        const isPasswordValid = await this.passwordServices.verifyPassword(password, passwordHash);
        if (isPasswordValid === false) {
            throw new InvalidCredentialsError();
        }

        return user;
    }

    public async getProfile(id: string): Promise<UserModel> {
        const user = await this.userRepository.findById(id);
        if (user === null) {
            throw new UserNotFoundError(id);
        }
        return user;
    }

    public async updateProfile(id: string, name: string): Promise<UserModel> {
        const user = await this.userRepository.findById(id);
        if (user === null) {
            throw new UserNotFoundError(id);
        }

        return this.userRepository.updateProfile(id, name);
    }
}
