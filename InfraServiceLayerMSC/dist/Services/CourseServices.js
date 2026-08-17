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
exports.CourseServices = void 0;
const common_1 = require("@nestjs/common");
const CourseRepository_1 = require("../Repositories/CourseRepository");
const UserRepository_1 = require("../Repositories/UserRepository");
const PasswordServices_1 = require("./PasswordServices");
const AlreadyEnrolledError_1 = require("../Errors/AlreadyEnrolledError");
const NotEnrolledError_1 = require("../Errors/NotEnrolledError");
const CourseNotFoundError_1 = require("../Errors/CourseNotFoundError");
let CourseServices = class CourseServices {
    courseRepository;
    userRepository;
    passwordServices;
    constructor(courseRepository, userRepository, passwordServices) {
        this.courseRepository = courseRepository;
        this.userRepository = userRepository;
        this.passwordServices = passwordServices;
    }
    async getAllCourses() {
        return this.courseRepository.findAll();
    }
    async getEnrolledCourses(studentId) {
        return this.courseRepository.findEnrolled(studentId);
    }
    async enroll(studentId, courseId) {
        const course = await this.courseRepository.findById(courseId);
        if (course === null) {
            throw new CourseNotFoundError_1.CourseNotFoundError(courseId);
        }
        const existingEnrollment = await this.courseRepository.findEnrollment(studentId, courseId);
        if (existingEnrollment !== null) {
            throw new AlreadyEnrolledError_1.AlreadyEnrolledError(courseId);
        }
        return this.courseRepository.enroll(studentId, courseId);
    }
    async updateProgress(studentId, courseId, progress) {
        const enrollment = await this.courseRepository.findEnrollment(studentId, courseId);
        if (enrollment === null) {
            throw new NotEnrolledError_1.NotEnrolledError(courseId);
        }
        return this.courseRepository.updateProgress(studentId, courseId, progress);
    }
    async seedCourses() {
        const existingCourses = await this.courseRepository.findAll();
        if (existingCourses.length > 0) {
            return 0;
        }
        let instructor = await this.userRepository.findByEmail('instructor@elearning.com');
        if (instructor === null) {
            const passwordHash = await this.passwordServices.hashPassword('Instructor123!');
            instructor = await this.userRepository.create('instructor@elearning.com', passwordHash, 'E-Learning Instructor', 'TEACHER');
        }
        const instructorId = instructor.id;
        const defaultCourses = [
            {
                title: "Web Development",
                description: "Learn the fundamentals of HTML, CSS and JavaScript and build a strong foundation in modern web development.",
                category: "Development",
                level: "Beginner",
                duration: "8 Weeks",
                lessons: "32 Lessons",
                rating: "4.8",
                objectives: [
                    "Understand the fundamentals of web development",
                    "Create structured web pages using HTML",
                    "Design responsive layouts using CSS",
                    "Add interactivity using JavaScript",
                    "Understand basic website development workflow",
                    "Build and organize web development projects"
                ],
                modules: [
                    { name: "Module 1 — Introduction to Web Development", description: "Introduction to websites, web technologies and basic development concepts.", lessons: 6 },
                    { name: "Module 2 — HTML Fundamentals", description: "Learn page structure, elements, forms, tables and semantic HTML.", lessons: 7 },
                    { name: "Module 3 — CSS Fundamentals", description: "Learn styling, layouts, responsive design and modern CSS techniques.", lessons: 7 },
                    { name: "Module 4 — JavaScript Basics", description: "Learn variables, functions, events, conditions and basic interactivity.", lessons: 8 },
                    { name: "Module 5 — Practical Web Project", description: "Apply HTML, CSS and JavaScript concepts to create a practical project.", lessons: 4 }
                ],
                instructorId: instructorId
            },
            {
                title: "Java Programming",
                description: "Learn Java programming concepts, object-oriented programming, exception handling and application development.",
                category: "Programming",
                level: "Intermediate",
                duration: "10 Weeks",
                lessons: "40 Lessons",
                rating: "4.7",
                objectives: [
                    "Understand Java programming fundamentals",
                    "Work with variables, data types and operators",
                    "Understand object-oriented programming",
                    "Use inheritance, polymorphism and encapsulation",
                    "Handle exceptions and errors",
                    "Develop structured Java applications"
                ],
                modules: [
                    { name: "Module 1 — Introduction to Java", description: "Introduction to Java, features, installation and basic program structure.", lessons: 7 },
                    { name: "Module 2 — Java Fundamentals", description: "Variables, data types, operators, conditions and loops.", lessons: 8 },
                    { name: "Module 3 — Object-Oriented Programming", description: "Classes, objects, constructors, methods and encapsulation.", lessons: 9 },
                    { name: "Module 4 — Inheritance and Polymorphism", description: "Inheritance, method overriding, polymorphism and abstraction.", lessons: 8 },
                    { name: "Module 5 — Exception Handling & Practical Project", description: "Exception handling, debugging and development of a practical Java project.", lessons: 8 }
                ],
                instructorId: instructorId
            },
            {
                title: "Database Management",
                description: "Learn database concepts, SQL, database design, relationships and essential database management techniques.",
                category: "Database",
                level: "Intermediate",
                duration: "7 Weeks",
                lessons: "28 Lessons",
                rating: "4.6",
                objectives: [
                    "Understand database management concepts",
                    "Learn relational database structures",
                    "Write SQL queries",
                    "Understand keys and relationships",
                    "Learn normalization concepts",
                    "Manage and retrieve database information"
                ],
                modules: [
                    { name: "Module 1 — Introduction to DBMS", description: "Database concepts, DBMS architecture and database applications.", lessons: 5 },
                    { name: "Module 2 — Relational Database Concepts", description: "Tables, records, attributes, relationships and relational models.", lessons: 6 },
                    { name: "Module 3 — SQL Fundamentals", description: "SELECT, INSERT, UPDATE, DELETE and essential SQL commands.", lessons: 7 },
                    { name: "Module 4 — Keys and Normalization", description: "Primary keys, foreign keys, candidate keys and normalization.", lessons: 5 },
                    { name: "Module 5 — Database Management & Project", description: "Database operations, queries and implementation of a practical project.", lessons: 5 }
                ],
                instructorId: instructorId
            },
            {
                title: "Python Programming",
                description: "Start programming with Python and learn variables, data structures, functions, modules and problem-solving.",
                category: "Programming",
                level: "Beginner",
                duration: "9 Weeks",
                lessons: "36 Lessons",
                rating: "4.9",
                objectives: [
                    "Understand Python programming fundamentals",
                    "Work with Python data types and operators",
                    "Use conditions and loops",
                    "Understand functions and modules",
                    "Work with lists, tuples and dictionaries",
                    "Build basic Python applications"
                ],
                modules: [
                    { name: "Module 1 — Introduction to Python", description: "Python features, installation, syntax and basic programming concepts.", lessons: 7 },
                    { name: "Module 2 — Variables and Data Types", description: "Variables, strings, numbers, operators and type conversion.", lessons: 7 },
                    { name: "Module 3 — Conditions and Loops", description: "Conditional statements, loops and control flow.", lessons: 7 },
                    { name: "Module 4 — Functions and Data Structures", description: "Functions, lists, tuples, sets and dictionaries.", lessons: 8 },
                    { name: "Module 5 — Modules & Practical Project", description: "Modules, file handling and development of a practical Python project.", lessons: 7 }
                ],
                instructorId: instructorId
            },
            {
                title: "Data Analytics",
                description: "Explore data analysis concepts, data visualization, reporting and techniques for extracting useful insights.",
                category: "Data",
                level: "Intermediate",
                duration: "8 Weeks",
                lessons: "30 Lessons",
                rating: "4.8",
                objectives: [
                    "Understand the fundamentals of data analytics",
                    "Collect and organize data",
                    "Perform basic data cleaning",
                    "Analyze data to identify patterns",
                    "Create meaningful visualizations",
                    "Prepare analytical reports"
                ],
                modules: [
                    { name: "Module 1 — Introduction to Data Analytics", description: "Data analytics concepts, types of data and analytical processes.", lessons: 6 },
                    { name: "Module 2 — Data Collection & Preparation", description: "Data sources, data organization and basic data cleaning.", lessons: 6 },
                    { name: "Module 3 — Exploratory Data Analysis", description: "Explore datasets, identify patterns and generate useful insights.", lessons: 6 },
                    { name: "Module 4 — Data Visualization", description: "Charts, graphs and effective techniques for presenting data.", lessons: 6 },
                    { name: "Module 5 — Reporting & Analytics Project", description: "Create analytical reports and complete a practical data project.", lessons: 6 }
                ],
                instructorId: instructorId
            },
            {
                title: "Cyber Security Fundamentals",
                description: "Understand fundamental cyber security concepts, online safety, common threats and basic security practices.",
                category: "Security",
                level: "Beginner",
                duration: "6 Weeks",
                lessons: "24 Lessons",
                rating: "4.7",
                objectives: [
                    "Understand basic cyber security concepts",
                    "Identify common cyber threats",
                    "Learn basic network security concepts",
                    "Understand authentication and access control",
                    "Learn safe online practices",
                    "Understand basic security management"
                ],
                modules: [
                    { name: "Module 1 — Introduction to Cyber Security", description: "Cyber security concepts, importance and basic security principles.", lessons: 5 },
                    { name: "Module 2 — Cyber Threats & Attacks", description: "Common cyber threats, risks and methods used to protect systems.", lessons: 5 },
                    { name: "Module 3 — Network Security Basics", description: "Basic networking concepts and security measures for networks.", lessons: 5 },
                    { name: "Module 4 — Authentication & Access Control", description: "Authentication, authorization, passwords and access management.", lessons: 5 },
                    { name: "Module 5 — Security Practices & Project", description: "Safe computing practices, security awareness and a practical project.", lessons: 4 }
                ],
                instructorId: instructorId
            }
        ];
        await this.courseRepository.createMany(defaultCourses);
        return defaultCourses.length;
    }
    async createCourse(instructorId, courseData) {
        return this.courseRepository.create({
            ...courseData,
            instructorId: instructorId,
        });
    }
    async deleteCourse(id) {
        const course = await this.courseRepository.findById(id);
        if (course === null) {
            throw new CourseNotFoundError_1.CourseNotFoundError(id);
        }
        return this.courseRepository.delete(id);
    }
};
exports.CourseServices = CourseServices;
exports.CourseServices = CourseServices = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [CourseRepository_1.CourseRepository,
        UserRepository_1.UserRepository,
        PasswordServices_1.PasswordServices])
], CourseServices);
//# sourceMappingURL=CourseServices.js.map