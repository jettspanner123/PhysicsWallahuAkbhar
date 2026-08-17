import { CourseModel } from './CourseModel';

export class EnrollmentModel {
    public readonly id: string;
    public readonly studentId: string;
    public readonly courseId: string;
    public readonly progress: number;
    public readonly enrolledAt: string;
    public readonly course?: CourseModel;

    public constructor(
        id: string,
        studentId: string,
        courseId: string,
        progress: number,
        enrolledAt: string,
        course?: CourseModel
    ) {
        this.id = id;
        this.studentId = studentId;
        this.courseId = courseId;
        this.progress = progress;
        this.enrolledAt = enrolledAt;
        this.course = course;
    }
}
