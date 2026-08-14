export class AuthResponseModel {
    public readonly userId: string;
    public readonly name: string;
    public readonly email: string;
    public readonly role: string;
    public readonly token: string;

    public constructor(
        userId: string,
        name: string,
        email: string,
        role: string,
        token: string
    ) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.role = role;
        this.token = token;
    }
}
