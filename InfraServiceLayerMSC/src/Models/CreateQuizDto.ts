export class CreateQuestionDto {

    public readonly text!: string;
    public readonly options!: string[];
    public readonly correctOption!: number;
    public readonly points?: number;
}

export class CreateQuizDto {

    public readonly title!: string;
    public readonly courseId!: string;
    public readonly moduleName!: string;
    public readonly questions!: CreateQuestionDto[];
}
