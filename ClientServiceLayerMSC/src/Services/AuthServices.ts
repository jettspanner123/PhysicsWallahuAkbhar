import { HttpClientServices } from './HttpClientServices';
import { LoginRequestDto } from '../Models/LoginRequestDto';
import { SignupRequestDto } from '../Models/SignupRequestDto';
import { UpdateProfileDto } from '../Models/UpdateProfileDto';
import { ResponseModel } from '../Models/ResponseModel';
import { AuthResponseModel } from '../Models/AuthResponseModel';
import { UserModel } from '../Models/UserModel';

export class AuthServices {
    private static instance: AuthServices | null = null;
    private readonly httpClient: HttpClientServices;

    private constructor() {
        this.httpClient = HttpClientServices.getInstance();
    }

    public static getInstance(): AuthServices {
        if (AuthServices.instance === null) {
            AuthServices.instance = new AuthServices();
        }
        return AuthServices.instance;
    }

    public async login(
        email: string,
        password: string
    ): Promise<ResponseModel<AuthResponseModel>> {
        const loginRequest = new LoginRequestDto(email, password);
        
        const response = await this.httpClient.post<ResponseModel<any>>(
            '/auth/login',
            loginRequest
        );

        // Store token if login successful
        if (response.success && response.data) {
            const authData = response.data;
            // Backend sends: { user: { id, email, name, role }, accessToken }
            localStorage.setItem('authToken', authData.accessToken);
            localStorage.setItem('userId', authData.user.id);
            localStorage.setItem('userName', authData.user.name);
            localStorage.setItem('userEmail', authData.user.email);
            localStorage.setItem('userRole', authData.user.role);
        }

        return response;
    }

    public async register(
        name: string,
        email: string,
        password: string,
        confirmPassword: string,
        role: string = "STUDENT"
    ): Promise<ResponseModel<AuthResponseModel>> {
        const signupRequest = new SignupRequestDto(
            name,
            email,
            password,
            confirmPassword,
            role
        );

        const response = await this.httpClient.post<ResponseModel<any>>(
            '/auth/register',
            signupRequest
        );

        // Store token if registration successful
        if (response.success && response.data) {
            const authData = response.data;
            // Backend sends: { user: { id, email, name, role }, accessToken }
            localStorage.setItem('authToken', authData.accessToken);
            localStorage.setItem('userId', authData.user.id);
            localStorage.setItem('userName', authData.user.name);
            localStorage.setItem('userEmail', authData.user.email);
            localStorage.setItem('userRole', authData.user.role);
        }

        return response;
    }

    public logout(): void {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userRole');
    }

    public isAuthenticated(): boolean {
        return localStorage.getItem('authToken') !== null;
    }

    public getAuthToken(): string | null {
        return localStorage.getItem('authToken');
    }

    public getUserInfo(): {
        userId: string | null;
        name: string | null;
        email: string | null;
        role: string | null;
    } {
        return {
            userId: localStorage.getItem('userId'),
            name: localStorage.getItem('userName'),
            email: localStorage.getItem('userEmail'),
            role: localStorage.getItem('userRole'),
        };
    }

    public async updateProfile(
        userId: string,
        name?: string,
        email?: string
    ): Promise<UserModel> {
        const updateDto = new UpdateProfileDto(name, email);

        const response = await this.httpClient.put<UserModel>(
            `/users/profile/${userId}`,
            updateDto
        );

        // Update localStorage with new values
        if (name) {
            localStorage.setItem('userName', response.name);
        }
        if (email) {
            localStorage.setItem('userEmail', response.email);
        }

        return response;
    }
}
