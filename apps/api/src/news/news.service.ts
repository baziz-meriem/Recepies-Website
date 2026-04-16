import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsArticle } from '../entities/news.entity';
import { NewsDesc } from '../entities/news-desc.entity';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(NewsArticle)
    private readonly news: Repository<NewsArticle>,
    @InjectRepository(NewsDesc)
    private readonly newsDesc: Repository<NewsDesc>,
  ) {}

  findAll() {
    return this.news.find({ order: { id: 'ASC' } });
  }

  async findOneWithDetails(id: number) {
    const article = await this.news.findOne({ where: { id } });
    if (!article) {
      throw new NotFoundException();
    }
    const details = await this.newsDesc.find({
      where: { newsId: id },
      order: { id: 'ASC' },
    });
    return { news: article, details };
  }
}
