import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { existsSync } from 'fs';
import { AppModule } from './app.module';
import { resolveAssetsRoot } from './assets-root';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const assetsRoot = resolveAssetsRoot();
  if (existsSync(assetsRoot)) {
    // Mounted on Express directly so paths stay /static/... (not under global /api prefix).
    app.useStaticAssets(assetsRoot, { prefix: '/static/' });
  }

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.enableCors({ origin: true, credentials: true });
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
}
bootstrap();
