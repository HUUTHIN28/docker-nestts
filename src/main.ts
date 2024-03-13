import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { RolesGuard } from './middleware/guards';
import { ValidationPipe } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalGuards(new RolesGuard(new JwtService(), new Reflector()));
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: ['http://localhost:8081'],
    methods: ['GET', 'POST'],
    credentials: true,
  });
  await app.listen(8000);
}
bootstrap();
