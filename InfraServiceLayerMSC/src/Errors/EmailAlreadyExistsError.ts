export class EmailAlreadyExistsError extends Error {

    public constructor(email: string) {
        super(`Email '${email}' is already registered.`);
        this.name = 'EmailAlreadyExistsError';
    }
}
