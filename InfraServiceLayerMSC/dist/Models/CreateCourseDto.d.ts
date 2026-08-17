import { CourseModule } from './CourseModule';
export declare class CreateCourseDto {
    readonly title: string;
    readonly description: string;
    readonly category: string;
    readonly level: string;
    readonly duration: string;
    readonly lessons: string;
    readonly objectives: string[];
    readonly modules: CourseModule[];
}
