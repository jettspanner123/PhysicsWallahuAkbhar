export declare class CreateQuestionDto {
    readonly text: string;
    readonly options: string[];
    readonly correctOption: number;
    readonly points?: number;
}
export declare class CreateQuizDto {
    readonly title: string;
    readonly courseId: string;
    readonly moduleName: string;
    readonly questions: CreateQuestionDto[];
}
