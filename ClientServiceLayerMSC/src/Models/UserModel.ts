export class UserModel {
    public readonly id: string;
    public readonly email: string;
    public readonly name: string;
    public readonly role: string;
    public readonly createdAt: Date;
    public readonly updatedAt: Date;

    public constructor(
        id: string,
        email: string,
        name: string,
        role: string,
        createdAt: Date,
        updatedAt: Date
    ) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.role = role;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
