import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('Users APIs')
    .setDescription('By: Jose Martinez | Systems Engineer')
    .setVersion('v1.0')
    .addServer('http://localhost:3000/', 'Local environment')
    .addTag('Endpoints')
    .build();

const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

await app.listen(3000);
}
bootstrap();
