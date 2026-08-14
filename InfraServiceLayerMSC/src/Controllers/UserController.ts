import {
    Controller,
    Post,
    Get,
    Put,
    Body,
    Param,
    HttpCode,
    HttpStatus,
    ConflictException,
    UnauthorizedException,
    NotFoundException,
    InternalServerErrorException,
} from '@nestjs/common';
import { UserServices } from '../Services/UserServices';
import { UserModel } from '../Models/UserModel';
import { SignupDto } from '../Models/SignupDto';
import { LoginDto } from '../Models/LoginDto';
import { UpdateProfileDto } from '../Models/UpdateProfileDto';
import { EmailAlreadyExistsError } from '../Errors/EmailAlreadyExistsError';
import { InvalidCredentialsError } from '../Errors/InvalidCredentialsError';
import { UserNotFoundError } from '../Errors/UserNotFoundError';

@Controller('users')
export class UserController {

    private readonly userServices: UserServices;

    public constructor(userServices: UserServices) {
        this.userServices = userServices;
    }

    @Post('signup')
    @HttpCode(HttpStatus.CREATED)
    public async signup(@Body() signupDto: SignupDto): Promise<UserModel> {
        try {
            return await this.userServices.signup(
                signupDto.email,
                signupDto.password,
                signupDto.name,
                signupDto.role
            );
        } catch (error: unknown) {
            if (error instanceof EmailAlreadyExistsError) {
                throw new ConflictException(error.message);
            }
            throw new InternalServerErrorException('An unexpected error occurred during signup.');
        }
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    public async login(@Body() loginDto: LoginDto): Promise<UserModel> {
        try {
            return await this.userServices.login(loginDto.email, loginDto.password);
        } catch (error: unknown) {
            if (error instanceof InvalidCredentialsError) {
                throw new UnauthorizedException(error.message);
            }
            throw new InternalServerErrorException('An unexpected error occurred during login.');
        }
    }

    @Get('profile/:id')
    @HttpCode(HttpStatus.OK)
    public async getProfile(@Param('id') id: string): Promise<UserModel> {
        try {
            return await this.userServices.getProfile(id);
        } catch (error: unknown) {
            if (error instanceof UserNotFoundError) {
                throw new NotFoundException(error.message);
            }
            throw new InternalServerErrorException('An unexpected error occurred retrieving profile.');
        }
    }

    @Put('profile/:id')
    @HttpCode(HttpStatus.OK)
    public async updateProfile(
        @Param('id') id: string,
        @Body() updateProfileDto: UpdateProfileDto
    ): Promise<UserModel> {
        try {
            return await this.userServices.updateProfile(
                id, 
                updateProfileDto.name, 
                updateProfileDto.email
            );
        } catch (error: unknown) {
            if (error instanceof UserNotFoundError) {
                throw new NotFoundException(error.message);
            }
            if (error instanceof EmailAlreadyExistsError) {
                throw new ConflictException(error.message);
            }
            throw new InternalServerErrorException('An unexpected error occurred updating profile.');
        }
    }
}
