import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      /* whitelist filtra que no mandemos data de mas  */
      whitelist: true,
      /* responder con un mensaje de errror si manda mas propiedad de las necesarias */
      forbidNonWhitelisted: true,
      transformOptions: {
        /* indicamos que siempre los tipo de datos van a ser correcto osea number con int y text con string */
        /* como tla hace una convrsion parse automaticamente CRREO */
        enableImplicitConversion: true,
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
