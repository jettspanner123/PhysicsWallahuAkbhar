import { UserModel } from './UserModel';

export class AuthResponseModel {

    public readonly user: UserModel;
    public readonly accessToken: string;

    public constructor(user: UserModel, accessToken: string) {
        this.user = user;
        this.accessToken = accessToken;
    }
}
