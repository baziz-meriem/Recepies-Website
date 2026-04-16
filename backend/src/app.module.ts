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
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        // Prefer 127.0.0.1 over localhost — Node may resolve ::1 first while MySQL listens on IPv4 only.
        host: config.get<string>('DB_HOST', '127.0.0.1'),
        port: Number(config.get('DB_PORT', 3306)),
        username: config.get<string>('DB_USER', 'root'),
        password: config.get<string>('DB_PASSWORD', ''),
        database: config.get<string>('DB_NAME', 'recettes'),
        autoLoadEntities: true,
        synchronize: false,
        logging: config.get<string>('DB_LOGGING') === 'true',
      }),
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
