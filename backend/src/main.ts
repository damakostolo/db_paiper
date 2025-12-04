import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { ZodValidationPipe } from 'nestjs-zod';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(helmet());
  app.useGlobalPipes(new ZodValidationPipe());

  const port = process.env.PORT || 3001;
  await app.listen(port);
}

bootstrap();
