import { CourseServices } from '../Services/CourseServices';
import { ResponseModel } from '../Models/ResponseModel';
import { EnrollCourseDto } from '../Models/EnrollCourseDto';
import { UpdateProgressDto } from '../Models/UpdateProgressDto';
import { CreateCourseDto } from '../Models/CreateCourseDto';
export declare class CourseController {
    private readonly courseServices;
    constructor(courseServices: CourseServices);
    create(req: any, createCourseDto: CreateCourseDto): Promise<ResponseModel<any>>;
    seed(): Promise<ResponseModel<{
        count: number;
    }>>;
    getCatalog(): Promise<ResponseModel<any[]>>;
    getEnrolled(req: any): Promise<ResponseModel<any[]>>;
    enroll(req: any, enrollCourseDto: EnrollCourseDto): Promise<ResponseModel<any>>;
    updateProgress(req: any, updateProgressDto: UpdateProgressDto): Promise<ResponseModel<any>>;
    delete(req: any, id: string): Promise<ResponseModel<any>>;
}
