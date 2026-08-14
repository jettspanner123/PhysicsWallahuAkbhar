export class SignupRequestDto {
    public readonly name: string;
    public readonly email: string;
    public readonly password: string;
    public readonly confirmPassword: string;
    public readonly role: string;

    public constructor(
        name: string,
        email: string,
        password: string,
        confirmPassword: string,
        role: string = "STUDENT"
    ) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.role = role;
    }
}
