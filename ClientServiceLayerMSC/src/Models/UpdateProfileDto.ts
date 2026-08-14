export class UpdateProfileDto {
    public readonly name?: string;
    public readonly email?: string;

    public constructor(name?: string, email?: string) {
        this.name = name;
        this.email = email;
    }
}
