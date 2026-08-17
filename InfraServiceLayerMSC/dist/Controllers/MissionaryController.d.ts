import { MissionaryServices } from '../Services/MissionaryServices';
import { CreateMissionaryDto } from '../Models/CreateMissionaryDto';
import { ResponseModel } from '../Models/ResponseModel';
export declare class MissionaryController {
    private readonly missionaryServices;
    constructor(missionaryServices: MissionaryServices);
    createContact(createMissionaryDto: CreateMissionaryDto): Promise<ResponseModel<any>>;
}
