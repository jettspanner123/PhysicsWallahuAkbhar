import {
    Controller,
    Post,
    Body,
    HttpCode,
    HttpStatus,
    BadRequestException,
    ConflictException,
    UnauthorizedException,
    InternalServerErrorException,
    UseFilters,
} from '@nestjs/common';
import { AuthServices } from '../Services/AuthServices';
import { SignupRequestDto } from '../Models/SignupRequestDto';
import { LoginRequestDto } from '../Models/LoginRequestDto';
import { ResponseModel } from '../Models/ResponseModel';
import { AuthResponseModel } from '../Models/AuthResponseModel';
import { HttpExceptionFilter } from '../Filters/HttpExceptionFilter';
import { InvalidEmailError } from '../Errors/InvalidEmailError';
import { PasswordsDoNotMatchError } from '../Errors/PasswordsDoNotMatchError';
import { EmailAlreadyExistsError } from '../Errors/EmailAlreadyExistsError';
import { InvalidCredentialsError } from '../Errors/InvalidCredentialsError';

@Controller('auth')
@UseFilters(HttpExceptionFilter)
export class AuthController {

    private readonly authServices: AuthServices;

    public constructor(authServices: AuthServices) {
        this.authServices = authServices;
    }

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    public async register(
        @Body() signupRequestDto: SignupRequestDto
    ): Promise<ResponseModel<AuthResponseModel>> {
        try {
            const data: AuthResponseModel = await this.authServices.register(
                signupRequestDto.name,
                signupRequestDto.email,
                signupRequestDto.password,
                signupRequestDto.confirmPassword,
                signupRequestDto.role
            );
            return new ResponseModel<AuthResponseModel>(
                true,
                'User registered successfully.',
                data
            );
        } catch (error: unknown) {
            if (error instanceof InvalidEmailError || error instanceof PasswordsDoNotMatchError) {
                throw new BadRequestException(error.message);
            }
            if (error instanceof EmailAlreadyExistsError) {
                throw new ConflictException(error.message);
            }
            throw new InternalServerErrorException('An error occurred during registration.');
        }
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    public async login(
        @Body() loginRequestDto: LoginRequestDto
    ): Promise<ResponseModel<AuthResponseModel>> {
        try {
            const data: AuthResponseModel = await this.authServices.login(
                loginRequestDto.email,
                loginRequestDto.password
            );
            return new ResponseModel<AuthResponseModel>(
                true,
                'User logged in successfully.',
                data
            );
        } catch (error: unknown) {
            if (error instanceof InvalidEmailError) {
                throw new BadRequestException(error.message);
            }
            if (error instanceof InvalidCredentialsError) {
                throw new UnauthorizedException(error.message);
            }
            throw new InternalServerErrorException('An error occurred during login.');
        }
    }
}
