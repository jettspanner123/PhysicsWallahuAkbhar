import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

export class Application {

    private constructor() {}

    public static async bootstrap(): Promise<void> {
        const app = await NestFactory.create(AppModule);
        
        // Enable CORS for frontend
        const allowedOrigins = [
            'http://localhost:5173',
            'http://127.0.0.1:5173',
            'https://physics-wallahu-akbhar.vercel.app',
            process.env.FRONTEND_URL,
        ].filter(Boolean) as (string | RegExp)[];

        app.enableCors({
            origin: [
                ...allowedOrigins,
                /\.vercel\.app$/, // Allow Vercel preview deployments
            ],
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
        });
        
        await app.listen(process.env.PORT ?? 3000);
    }
}

Application.bootstrap();

