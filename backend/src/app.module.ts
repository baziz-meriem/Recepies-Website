import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { NewsModule } from './news/news.module';
import { NutritionModule } from './nutrition/nutrition.module';
import { HealthController } from './health.controller';
import { RecipesModule } from './recipes/recipes.module';
import { UploadsModule } from './uploads/uploads.module';

/**
 * Demo defaults (Aiven MySQL). Override with `DB_*` env vars for local Docker, etc.
 * Never commit `DB_PASSWORD`; set it in Render or `backend/.env`.
 */
const DEMO_DB_HOST = 'mysql-2b338b70-esi-cd05.a.aivencloud.com';
const DEMO_DB_PORT = 14095;
const DEMO_DB_USER = 'avnadmin';
const DEMO_DB_NAME = 'defaultdb';

/** Resolve .env when dev runs from repo root (`npm run dev`) or from `backend/`. */
const envFilePaths = [
  join(process.cwd(), 'backend', '.env'),
  join(process.cwd(), '.env'),
  join(__dirname, '..', '.env'),
];

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: envFilePaths }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const host = config.get<string>('DB_HOST', DEMO_DB_HOST);
        const sslFlag = config.get<string>('DB_SSL');
        const useSsl =
          sslFlag === 'true' ||
          (sslFlag !== 'false' && host.includes('aivencloud.com'));

        return {
          type: 'mysql' as const,
          host,
          port: Number(config.get('DB_PORT', DEMO_DB_PORT)),
          username: config.get<string>('DB_USER', DEMO_DB_USER),
          password: config.get<string>('DB_PASSWORD', ''),
          database: config.get<string>('DB_NAME', DEMO_DB_NAME),
          autoLoadEntities: true,
          synchronize: false,
          logging: config.get<string>('DB_LOGGING') === 'true',
          ...(useSsl
            ? { ssl: { rejectUnauthorized: true } }
            : {}),
        };
      },
    }),
    AuthModule,
    RecipesModule,
    UploadsModule,
    NewsModule,
    NutritionModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
