import { HttpClientServices } from './HttpClientServices';
import { ResponseModel } from '../Models/ResponseModel';
import { AssignmentModel } from '../Models/AssignmentModel';

export class AssignmentServices {
    private static instance: AssignmentServices | null = null;
    private readonly httpClient: HttpClientServices;

    private constructor() {
        this.httpClient = HttpClientServices.getInstance();
    }

    public static getInstance(): AssignmentServices {
        if (AssignmentServices.instance === null) {
            AssignmentServices.instance = new AssignmentServices();
        }
        return AssignmentServices.instance;
    }

    public async createAssignment(assignmentData: {
        title: string;
        description: string;
        dueDate: string;
        courseId: string;
    }): Promise<ResponseModel<AssignmentModel>> {
        return this.httpClient.post<ResponseModel<AssignmentModel>>('/assignments', assignmentData);
    }

    public async getAssignmentsByCourse(courseId: string): Promise<ResponseModel<AssignmentModel[]>> {
        return this.httpClient.get<ResponseModel<AssignmentModel[]>>(`/assignments/course/${courseId}`);
    }

    public async getAssignmentById(id: string): Promise<ResponseModel<AssignmentModel>> {
        return this.httpClient.get<ResponseModel<AssignmentModel>>(`/assignments/${id}`);
    }

    public async deleteAssignment(id: string): Promise<ResponseModel<void>> {
        return this.httpClient.delete<ResponseModel<void>>(`/assignments/${id}`);
    }
}
