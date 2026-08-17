export interface CourseModule {
    name: string;
    description: string;
    lessons: number;
}

export class CourseModel {
    public readonly id: string;
    public readonly title: string;
    public readonly description: string;
    public readonly image?: string;
    public readonly category: string;
    public readonly level: string;
    public readonly duration: string;
    public readonly lessons: string;
    public readonly rating: string;
    public readonly objectives: string[];
    public readonly modules: CourseModule[];
    public readonly instructorId: string;
    public readonly createdAt: string;
    public readonly updatedAt: string;

    public constructor(
        id: string,
        title: string,
        description: string,
        category: string,
        level: string,
        duration: string,
        lessons: string,
        rating: string,
        objectives: string[],
        modules: CourseModule[],
        instructorId: string,
        createdAt: string,
        updatedAt: string,
        image?: string
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.category = category;
        this.level = level;
        this.duration = duration;
        this.lessons = lessons;
        this.rating = rating;
        this.objectives = objectives;
        this.modules = modules;
        this.instructorId = instructorId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.image = image;
    }
}
