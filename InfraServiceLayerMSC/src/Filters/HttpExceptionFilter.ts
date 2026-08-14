import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { ResponseModel } from '../Models/ResponseModel';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

    public constructor() {}

    public catch(exception: HttpException, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();
        const exceptionResponse: unknown = exception.getResponse();

        let message: string = exception.message;
        if (exceptionResponse !== null && typeof exceptionResponse === 'object') {
            const resObj = exceptionResponse as { message?: string | string[] };
            if (resObj.message !== undefined) {
                message = Array.isArray(resObj.message)
                    ? resObj.message.join(', ')
                    : resObj.message;
            }
        }

        const body: ResponseModel<null> = new ResponseModel<null>(false, message, null);
        response.status(status).json(body);
    }
}
