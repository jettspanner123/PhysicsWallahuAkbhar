import { Injectable } from '@nestjs/common';
import { MissionaryRepository } from '../Repositories/MissionaryRepository';

@Injectable()
export class MissionaryServices {

    private readonly missionaryRepository: MissionaryRepository;

    public constructor(missionaryRepository: MissionaryRepository) {
        this.missionaryRepository = missionaryRepository;
    }

    public async createContactMessage(fullName: string, email: string, subject: string, message: string): Promise<any> {
        return this.missionaryRepository.create(fullName, email, subject, message);
    }
}
