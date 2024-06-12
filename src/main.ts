import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exception.filter'; // Імпортуємо ваш фільтр помилок

async function bootstrap() {
  const configService = new ConfigService();
  const app = await NestFactory.create(AppModule); // test

  app.enableCors({ credentials: true, origin: '*' });
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(configService.get<number>('PORT'));
}
bootstrap();
