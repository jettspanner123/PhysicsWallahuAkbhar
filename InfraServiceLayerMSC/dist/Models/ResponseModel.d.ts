export declare class ResponseModel<T> {
    readonly success: boolean;
    readonly message: string;
    readonly data: T;
    constructor(success: boolean, message: string, data: T);
}
