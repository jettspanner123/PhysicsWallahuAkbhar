export interface QuestionModel {
    id?: string;
    text: string;
    options: string[];
    correctOption: number;
    points?: number;
}

export interface QuizModel {
    id: string;
    title: string;
    courseId: string;
    moduleName: string;
    questions?: QuestionModel[];
    createdAt?: string;
    updatedAt?: string;
}

export interface QuizAttemptModel {
    id: string;
    quizId: string;
    studentId: string;
    score: number;
    answers: number[];
    completedAt: string;
    quiz?: QuizModel;
}
