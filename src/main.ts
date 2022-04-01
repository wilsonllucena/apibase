import { NotFoundInterceptor } from './inteceptors/not-found.interceptor';
import { UniqueValueInterceptor } from './inteceptors/unique-value.interceptor';
import { ValidationPipe } from './pipes/validation.pipe';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(
    new UniqueValueInterceptor(),
    new NotFoundInterceptor(),
  );
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
