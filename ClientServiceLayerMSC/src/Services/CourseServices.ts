import { HttpClientServices } from './HttpClientServices';
import { ResponseModel } from '../Models/ResponseModel';
import { CourseModel } from '../Models/CourseModel';
import { EnrollmentModel } from '../Models/EnrollmentModel';

export class CourseServices {
    private static instance: CourseServices | null = null;
    private readonly httpClient: HttpClientServices;

    private constructor() {
        this.httpClient = HttpClientServices.getInstance();
    }

    public static getInstance(): CourseServices {
        if (CourseServices.instance === null) {
            CourseServices.instance = new CourseServices();
        }
        return CourseServices.instance;
    }

    public async seedCourses(): Promise<ResponseModel<{ count: number }>> {
        return this.httpClient.post<ResponseModel<{ count: number }>>('/courses/seed', {});
    }

    public async getAllCourses(): Promise<ResponseModel<CourseModel[]>> {
        return this.httpClient.get<ResponseModel<CourseModel[]>>('/courses');
    }

    public async getEnrolledCourses(): Promise<ResponseModel<EnrollmentModel[]>> {
        return this.httpClient.get<ResponseModel<EnrollmentModel[]>>('/courses/enrolled');
    }

    public async enroll(courseId: string): Promise<ResponseModel<EnrollmentModel>> {
        return this.httpClient.post<ResponseModel<EnrollmentModel>>('/courses/enroll', { courseId });
    }

    public async updateProgress(courseId: string, progress: number): Promise<ResponseModel<EnrollmentModel>> {
        return this.httpClient.post<ResponseModel<EnrollmentModel>>('/courses/progress', { courseId, progress });
    }

    public async createCourse(courseData: any): Promise<ResponseModel<CourseModel>> {
        return this.httpClient.post<ResponseModel<CourseModel>>('/courses', courseData);
    }

    public async deleteCourse(courseId: string): Promise<ResponseModel<any>> {
        return this.httpClient.delete<ResponseModel<any>>(`/courses/${courseId}`);
    }
}
