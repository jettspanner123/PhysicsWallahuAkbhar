export class AlreadyEnrolledError extends Error {

    public constructor(courseId: string) {
        super(`Student is already enrolled in course '${courseId}'.`);
        this.name = 'AlreadyEnrolledError';
    }
}
