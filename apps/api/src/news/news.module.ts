import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsDesc } from '../entities/news-desc.entity';
import { NewsArticle } from '../entities/news.entity';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';

@Module({
  imports: [TypeOrmModule.forFeature([NewsArticle, NewsDesc])],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
