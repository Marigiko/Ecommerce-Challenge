import 'tsconfig-paths/register';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for all origins
  // This need to be configured properly in production to allow only trusted origins
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const config = new DocumentBuilder()
    .setTitle('Ecommerce API')
    .setDescription('API documentation for the challenge')
    .setVersion('1.0')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('docs', app, document)

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
