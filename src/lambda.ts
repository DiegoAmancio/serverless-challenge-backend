import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configure as serverlessExpress } from '@vendia/serverless-express';
import { ValidationPipe } from '@nestjs/common';

let cachedServer: any;
export const handler = async (event: any, context: any) => {
  if (!cachedServer) {
    const nestApp = await NestFactory.create(AppModule);
    nestApp.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await nestApp.init();
    cachedServer = serverlessExpress({
      app: nestApp.getHttpAdapter().getInstance(),
    });
  }
  return cachedServer(event, context);
};
