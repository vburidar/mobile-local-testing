import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('ALLOW ORIGIN FROM', process.env.REACT_APP_FRONTEND_URL)
  app.enableCors({ credentials: true, origin: process.env.REACT_APP_FRONTEND_URL });
  await app.listen(8000);
}
bootstrap();
