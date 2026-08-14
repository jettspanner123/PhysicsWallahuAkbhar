export class PasswordsDoNotMatchError extends Error {

    public constructor() {
        super('Password and confirm password do not match.');
        this.name = 'PasswordsDoNotMatchError';
    }
}
