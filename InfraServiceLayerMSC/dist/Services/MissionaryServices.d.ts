import { MissionaryRepository } from '../Repositories/MissionaryRepository';
export declare class MissionaryServices {
    private readonly missionaryRepository;
    constructor(missionaryRepository: MissionaryRepository);
    createContactMessage(fullName: string, email: string, subject: string, message: string): Promise<any>;
    getAllContactMessages(): Promise<any[]>;
}
