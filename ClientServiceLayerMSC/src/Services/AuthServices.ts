import { HttpClientServices } from './HttpClientServices';
import { LoginRequestDto } from '../Models/LoginRequestDto';
import { SignupRequestDto } from '../Models/SignupRequestDto';
import { ResponseModel } from '../Models/ResponseModel';
import { AuthResponseModel } from '../Models/AuthResponseModel';

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
        
        const response = await this.httpClient.post<ResponseModel<AuthResponseModel>>(
            '/auth/login',
            loginRequest
        );

        // Store token if login successful
        if (response.success && response.data) {
            localStorage.setItem('authToken', response.data.token);
            localStorage.setItem('userId', response.data.userId);
            localStorage.setItem('userName', response.data.name);
            localStorage.setItem('userEmail', response.data.email);
            localStorage.setItem('userRole', response.data.role);
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

        const response = await this.httpClient.post<ResponseModel<AuthResponseModel>>(
            '/auth/register',
            signupRequest
        );

        // Store token if registration successful
        if (response.success && response.data) {
            localStorage.setItem('authToken', response.data.token);
            localStorage.setItem('userId', response.data.userId);
            localStorage.setItem('userName', response.data.name);
            localStorage.setItem('userEmail', response.data.email);
            localStorage.setItem('userRole', response.data.role);
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
}
