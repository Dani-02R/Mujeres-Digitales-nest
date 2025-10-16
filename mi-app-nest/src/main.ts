import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

/**
 * Punto de entrada principal de la aplicación NestJS.
 * 
 * Qué hace:
 * - Crea la instancia de la aplicación (`AppModule`).
 * - Aplica un ValidationPipe global (elimina propiedades no declaradas con `whitelist: true`).
 * - Lee el puerto desde variables de entorno o usa 3000 por defecto.
 * - Inicia el servidor HTTP y muestra la URL en consola.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
     whitelist: true,
    transform: true,
    transformOptions: { enableImplicitConversion: true },
  }));

  const port = process.env.PORT || 3000;

  await app.listen(port);

  console.log(`App running on: http://localhost:${port}`);
}
bootstrap();
