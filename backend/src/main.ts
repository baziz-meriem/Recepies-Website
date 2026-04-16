import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { existsSync } from 'fs';
import { AppModule } from './app.module';
import { resolveAssetsRoot } from './assets-root';

/** Same default host as AppModule — remote DB always needs DB_PASSWORD in process.env (e.g. Render). */
const DEMO_DB_HOST = 'mysql-2b338b70-esi-cd05.a.aivencloud.com';

function assertRemoteDbPassword() {
  const host = (process.env.DB_HOST ?? '').trim() || DEMO_DB_HOST;
  const isLocal =
    host === '127.0.0.1' ||
    host === 'localhost' ||
    host === '::1';
  if (isLocal) {
    return;
  }
  if (!process.env.DB_PASSWORD?.trim()) {
    // eslint-disable-next-line no-console
    console.error(
      '\nDB_PASSWORD is missing. Render (and other hosts) do not use backend/.env from the repo.\n' +
        'Add DB_PASSWORD in Render → Environment with the same value as in your Aiven service URI.\n',
    );
    process.exit(1);
  }
}

async function bootstrap() {
  assertRemoteDbPassword();
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
