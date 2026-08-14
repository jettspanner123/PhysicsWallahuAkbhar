import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

export class Application {

    private constructor() {}

    public static async bootstrap(): Promise<void> {
        const app = await NestFactory.create(AppModule);
        
        // Enable CORS for frontend (localhost:5173)
        app.enableCors({
            origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
        });
        
        await app.listen(process.env.PORT ?? 3000);
    }
}

Application.bootstrap();

