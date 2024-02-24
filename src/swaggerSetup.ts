import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication<any>) {
  const options = new DocumentBuilder()
    .setTitle('Serverless Challenge Backend API')
    .setDescription('API for employee management')
    .setVersion('1.0')
    .addServer(`/${process.env.STAGE}`)
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
}
