import { NestFactory } from '@nestjs/core';
  import { AppModule } from './app.module';

  export class Application {

      private constructor() {}

      public static async bootstrap(): Promise<void> {
          const app = await NestFactory.create(AppModule);
          await app.listen(process.env.PORT ?? 3000);
      }
  }

  Application.bootstrap();
  
