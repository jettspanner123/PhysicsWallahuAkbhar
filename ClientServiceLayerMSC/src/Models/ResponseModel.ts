export class ResponseModel<T> {
    public readonly success: boolean;
    public readonly message: string;
    public readonly data: T | null;

    public constructor(
        success: boolean,
        message: string,
        data: T | null
    ) {
        this.success = success;
        this.message = message;
        this.data = data;
    }
}
