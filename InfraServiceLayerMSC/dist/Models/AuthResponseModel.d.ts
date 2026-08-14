import { UserModel } from './UserModel';
export declare class AuthResponseModel {
    readonly user: UserModel;
    readonly accessToken: string;
    constructor(user: UserModel, accessToken: string);
}
