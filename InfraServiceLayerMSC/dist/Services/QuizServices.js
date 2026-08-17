"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizServices = void 0;
const common_1 = require("@nestjs/common");
const QuizRepository_1 = require("../Repositories/QuizRepository");
const CourseRepository_1 = require("../Repositories/CourseRepository");
let QuizServices = class QuizServices {
    quizRepository;
    courseRepository;
    constructor(quizRepository, courseRepository) {
        this.quizRepository = quizRepository;
        this.courseRepository = courseRepository;
    }
    async createQuiz(courseId, moduleName, title, questions) {
        return this.quizRepository.create(courseId, moduleName, title, questions);
    }
    async getQuizzesByCourse(courseId) {
        return this.quizRepository.findByCourseId(courseId);
    }
    async getQuizById(id) {
        const quiz = await this.quizRepository.findById(id);
        if (quiz === null) {
            throw new common_1.NotFoundException(`Quiz with ID ${id} not found.`);
        }
        return quiz;
    }
    async submitAttempt(quizId, studentId, answers) {
        const quiz = await this.getQuizById(quizId);
        let correctCount = 0;
        const questions = quiz.questions;
        for (let i = 0; i < questions.length; i++) {
            const question = questions[i];
            const studentAnswer = answers[i];
            if (studentAnswer === question.correctOption) {
                correctCount++;
            }
        }
        const score = questions.length > 0 ? (correctCount / questions.length) * 100 : 0;
        return this.quizRepository.createAttempt(quizId, studentId, score, answers);
    }
    async getStudentAttempts(studentId) {
        return this.quizRepository.findAttemptsByStudentId(studentId);
    }
    async getStudentAttemptsByQuiz(studentId, quizId) {
        return this.quizRepository.findAttemptsByStudentAndQuiz(studentId, quizId);
    }
    async seedDefaultQuizzes() {
        const coursesInDb = await this.courseRepository.findAll();
        let seededCount = 0;
        const defaultQuizzesData = {
            "Web Development": [
                {
                    moduleName: "Module 1 — Introduction to Web Development",
                    title: "HTML Fundamentals Quiz",
                    questions: [
                        { text: "What is HTML?", options: ["A programming language", "A markup language used to structure web pages", "A database language", "An operating system"], correctOption: 1 },
                        { text: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Text Machine Language", "Hyperlink Text Management Language", "Home Tool Markup Language"], correctOption: 0 },
                        { text: "Which tag creates the main heading?", options: ["<p>", "<h1>", "<head>", "<title>"], correctOption: 1 },
                        { text: "Which tag creates a paragraph?", options: ["<paragraph>", "<text>", "<p>", "<para>"], correctOption: 2 },
                        { text: "Which tag creates a hyperlink?", options: ["<link>", "<a>", "<href>", "<url>"], correctOption: 1 }
                    ]
                },
                {
                    moduleName: "Module 2 — HTML Fundamentals",
                    title: "CSS Fundamentals Quiz",
                    questions: [
                        { text: "What is CSS mainly used for?", options: ["Creating databases", "Styling web pages", "Creating servers", "Managing files"], correctOption: 1 },
                        { text: "What does CSS stand for?", options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style System", "Colorful Style Sheets"], correctOption: 1 },
                        { text: "Which property changes text color?", options: ["font", "text-color", "color", "background"], correctOption: 2 },
                        { text: "Which property changes background color?", options: ["background-color", "bgcolor", "color", "background-text"], correctOption: 0 },
                        { text: "Which CSS property changes font size?", options: ["font-style", "font-size", "text-size", "size"], correctOption: 1 }
                    ]
                },
                {
                    moduleName: "Module 3 — CSS Fundamentals",
                    title: "JavaScript Basics Quiz",
                    questions: [
                        { text: "What is JavaScript mainly used for?", options: ["Making webpages interactive", "Creating databases only", "Formatting documents", "Managing hardware"], correctOption: 0 },
                        { text: "Which keyword can declare a variable?", options: ["var", "int", "string", "define"], correctOption: 0 },
                        { text: "Which symbol starts a single-line comment?", options: ["<!-- -->", "//", "##", "**"], correctOption: 1 },
                        { text: "Which method displays a message in the console?", options: ["console.log()", "print.console()", "display()", "message()"], correctOption: 0 },
                        { text: "Which language works with HTML and CSS to add interactivity?", options: ["Java", "Python", "JavaScript", "SQL"], correctOption: 2 }
                    ]
                }
            ],
            "Java Programming": [
                {
                    moduleName: "Module 1 — Introduction to Java",
                    title: "Java Fundamentals Quiz",
                    questions: [
                        { text: "What is Java?", options: ["A programming language", "A database", "An operating system", "A browser"], correctOption: 0 },
                        { text: "Which keyword creates a class?", options: ["function", "class", "struct", "object"], correctOption: 1 },
                        { text: "Which method starts a Java program?", options: ["start()", "run()", "main()", "execute()"], correctOption: 2 },
                        { text: "Which type stores whole numbers?", options: ["int", "float", "char", "boolean"], correctOption: 0 },
                        { text: "Java is mainly which type of language?", options: ["Object-oriented", "Markup", "Query", "Styling"], correctOption: 0 }
                    ]
                }
            ]
        };
        for (const courseDb of coursesInDb) {
            const quizTemplates = defaultQuizzesData[courseDb.title];
            if (!quizTemplates)
                continue;
            const existingQuizzes = await this.quizRepository.findByCourseId(courseDb.id);
            if (existingQuizzes.length > 0)
                continue;
            for (const template of quizTemplates) {
                await this.quizRepository.create(courseDb.id, template.moduleName, template.title, template.questions);
                seededCount++;
            }
        }
        return { count: seededCount };
    }
};
exports.QuizServices = QuizServices;
exports.QuizServices = QuizServices = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [QuizRepository_1.QuizRepository,
        CourseRepository_1.CourseRepository])
], QuizServices);
//# sourceMappingURL=QuizServices.js.map