export class CourseNotFoundError extends Error {

    public constructor(courseId: string) {
        super(`Course with ID '${courseId}' was not found.`);
        this.name = 'CourseNotFoundError';
    }
}
