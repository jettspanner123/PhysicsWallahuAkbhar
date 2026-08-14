export class UserNotFoundError extends Error {

    public constructor(id: string) {
        super(`User with ID '${id}' was not found.`);
        this.name = 'UserNotFoundError';
    }
}
