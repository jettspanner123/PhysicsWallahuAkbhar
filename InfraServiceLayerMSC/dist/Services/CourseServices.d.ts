import { CourseRepository } from '../Repositories/CourseRepository';
import { UserRepository } from '../Repositories/UserRepository';
import { PasswordServices } from './PasswordServices';
export declare class CourseServices {
    private readonly courseRepository;
    private readonly userRepository;
    private readonly passwordServices;
    constructor(courseRepository: CourseRepository, userRepository: UserRepository, passwordServices: PasswordServices);
    getAllCourses(): Promise<any[]>;
    getEnrolledCourses(studentId: string): Promise<any[]>;
    enroll(studentId: string, courseId: string): Promise<any>;
    updateProgress(studentId: string, courseId: string, progress: number): Promise<any>;
    seedCourses(): Promise<number>;
    createCourse(instructorId: string, courseData: any): Promise<any>;
    deleteCourse(id: string): Promise<any>;
}
