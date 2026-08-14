export class InvalidEmailError extends Error {

    public constructor(email: string) {
        super(`The email format for '${email}' is invalid.`);
        this.name = 'InvalidEmailError';
    }
}
