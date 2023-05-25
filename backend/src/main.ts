import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as dayjs from 'dayjs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
  });
  app.enableCors({
    origin: ["http://localhost:4200"]
  });
  app.setBaseViewsDir(join(__dirname, 'admin', 'views'));
  app.setViewEngine('pug');
  app.setLocal('dayjs', dayjs)
  await app.listen(3000);
}
bootstrap();
