import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as session from 'express-session';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    app.set('view engine', 'ejs');
    app.set('views', __dirname + '/views');
  await app.listen(3005);
}
bootstrap();
