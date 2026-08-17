export class NotEnrolledError extends Error {

    public constructor(courseId: string) {
        super(`Student is not enrolled in course '${courseId}'.`);
        this.name = 'NotEnrolledError';
    }
}
