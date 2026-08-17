import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AuthenticationConstants } from '../Constants/AuthenticationConstants';

@Injectable()
export class JwtAuthGuard implements CanActivate {

    private readonly jwtService: JwtService;

    public constructor(jwtService: JwtService) {
        this.jwtService = jwtService;
    }

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: Request & { user?: any } = context.switchToHttp().getRequest<Request>();
        const token: string | undefined = this.extractTokenFromHeader(request);
        if (token === undefined) {
            throw new UnauthorizedException('Authentication token is missing.');
        }
        try {
            const payload: any = await this.jwtService.verifyAsync(token, {
                secret: AuthenticationConstants.JWT_SECRET,
            });
            request['user'] = payload;
        } catch {
            throw new UnauthorizedException('Authentication token is invalid or expired.');
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
