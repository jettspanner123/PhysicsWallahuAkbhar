import { DatabaseProvider } from '../Providers/DatabaseProvider';
import { UserModel } from '../Models/UserModel';
export declare class UserRepository {
    private readonly databaseProvider;
    constructor(databaseProvider: DatabaseProvider);
    create(email: string, passwordHash: string, name: string, role: string): Promise<UserModel>;
    findByEmail(email: string): Promise<UserModel | null>;
    findById(id: string): Promise<UserModel | null>;
    getPasswordHashByEmail(email: string): Promise<string | null>;
    updateProfile(id: string, name: string): Promise<UserModel>;
}
