export class CourseModule {

    public readonly name: string;
    public readonly description: string;
    public readonly lessons: number;

    public constructor(name: string, description: string, lessons: number) {
        this.name = name;
        this.description = description;
        this.lessons = lessons;
    }
}
