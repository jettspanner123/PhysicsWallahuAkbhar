import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios';
import { ApiConfig } from '../Config/ApiConfig';

export class HttpClientServices {
    private static instance: HttpClientServices | null = null;
    private readonly axiosInstance: AxiosInstance;

    private constructor() {
        this.axiosInstance = axios.create({
            baseURL: ApiConfig.BASE_URL,
            timeout: ApiConfig.API_TIMEOUT,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.setupInterceptors();
    }

    public static getInstance(): HttpClientServices {
        if (HttpClientServices.instance === null) {
            HttpClientServices.instance = new HttpClientServices();
        }
        return HttpClientServices.instance;
    }

    private setupInterceptors(): void {
        // Request interceptor
        this.axiosInstance.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('authToken');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error: AxiosError) => {
                return Promise.reject(error);
            }
        );

        // Response interceptor
        this.axiosInstance.interceptors.response.use(
            (response: AxiosResponse) => {
                return response;
            },
            (error: AxiosError) => {
                return Promise.reject(error);
            }
        );
    }

    public async get<T>(url: string): Promise<T> {
        const response = await this.axiosInstance.get<T>(url);
        return response.data;
    }

    public async post<T>(url: string, data: unknown): Promise<T> {
        const response = await this.axiosInstance.post<T>(url, data);
        return response.data;
    }

    public async put<T>(url: string, data: unknown): Promise<T> {
        const response = await this.axiosInstance.put<T>(url, data);
        return response.data;
    }

    public async delete<T>(url: string): Promise<T> {
        const response = await this.axiosInstance.delete<T>(url);
        return response.data;
    }
}
