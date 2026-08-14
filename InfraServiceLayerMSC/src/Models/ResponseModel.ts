export class ResponseModel<T> {

    public readonly success: boolean;
    public readonly message: string;
    public readonly data: T;

    public constructor(success: boolean, message: string, data: T) {
        this.success = success;
        this.message = message;
        this.data = data;
    }
}
