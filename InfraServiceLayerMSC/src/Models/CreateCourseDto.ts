import { CourseModule } from './CourseModule';

export class CreateCourseDto {

    public readonly title!: string;
    public readonly description!: string;
    public readonly category!: string;
    public readonly level!: string;
    public readonly duration!: string;
    public readonly lessons!: string;
    public readonly objectives!: string[];
    public readonly modules!: CourseModule[];
}
