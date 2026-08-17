import { HttpClientServices } from './HttpClientServices';
import { ResponseModel } from '../Models/ResponseModel';

export class MissionaryServices {
    private static instance: MissionaryServices | null = null;
    private readonly httpClient: HttpClientServices;

    private constructor() {
        this.httpClient = HttpClientServices.getInstance();
    }

    public static getInstance(): MissionaryServices {
        if (MissionaryServices.instance === null) {
            MissionaryServices.instance = new MissionaryServices();
        }
        return MissionaryServices.instance;
    }

    public async submitContactMessage(
        fullName: string,
        email: string,
        subject: string,
        message: string
    ): Promise<ResponseModel<any>> {
        return this.httpClient.post<ResponseModel<any>>('/missionaries/contact', {
            fullName,
            email,
            subject,
            message,
        });
    }

    public async getContactMessages(): Promise<ResponseModel<any[]>> {
        return this.httpClient.get<ResponseModel<any[]>>('/missionaries');
    }
}
