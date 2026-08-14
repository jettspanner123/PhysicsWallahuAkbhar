import { Injectable } from '@nestjs/common';
import { DatabaseProvider } from '../Providers/DatabaseProvider';
import { UserModel } from '../Models/UserModel';

@Injectable()
export class UserRepository {

    private readonly databaseProvider: DatabaseProvider;

    public constructor(databaseProvider: DatabaseProvider) {
        this.databaseProvider = databaseProvider;
    }

    public async create(
        email: string,
        passwordHash: string,
        name: string,
        role: string
    ): Promise<UserModel> {
        const user = await this.databaseProvider.userModel.create({
            data: {
                email: email,
                password: passwordHash,
                name: name,
                role: role,
            },
        });

        return new UserModel(
            user.id,
            user.email,
            user.name,
            user.role,
            user.createdAt,
            user.updatedAt
        );
    }

    public async findByEmail(email: string): Promise<UserModel | null> {
        const user = await this.databaseProvider.userModel.findUnique({
            where: { email: email },
        });

        if (user === null) {
            return null;
        }

        return new UserModel(
            user.id,
            user.email,
            user.name,
            user.role,
            user.createdAt,
            user.updatedAt
        );
    }

    public async findById(id: string): Promise<UserModel | null> {
        const user = await this.databaseProvider.userModel.findUnique({
            where: { id: id },
        });

        if (user === null) {
            return null;
        }

        return new UserModel(
            user.id,
            user.email,
            user.name,
            user.role,
            user.createdAt,
            user.updatedAt
        );
    }

    public async getPasswordHashByEmail(email: string): Promise<string | null> {
        const user = await this.databaseProvider.userModel.findUnique({
            where: { email: email },
            select: { password: true },
        });

        if (user === null) {
            return null;
        }

        return user.password;
    }

    public async updateProfile(id: string, name: string): Promise<UserModel> {
        const user = await this.databaseProvider.userModel.update({
            where: { id: id },
            data: { name: name },
        });

        return new UserModel(
            user.id,
            user.email,
            user.name,
            user.role,
            user.createdAt,
            user.updatedAt
        );
    }
}
