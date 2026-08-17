import { AssignmentServices } from '../Services/AssignmentServices';
import { CreateAssignmentDto } from '../Models/CreateAssignmentDto';
import { ResponseModel } from '../Models/ResponseModel';
export declare class AssignmentController {
    private readonly assignmentServices;
    constructor(assignmentServices: AssignmentServices);
    create(req: any, createAssignmentDto: CreateAssignmentDto): Promise<ResponseModel<any>>;
    getByCourse(courseId: string): Promise<ResponseModel<any[]>>;
    getById(id: string): Promise<ResponseModel<any>>;
    delete(req: any, id: string): Promise<ResponseModel<void>>;
}
