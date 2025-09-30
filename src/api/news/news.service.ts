import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NewsEntity } from 'src/core/entities/news.entity';
import { Repository } from 'typeorm';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(NewsEntity)
    private readonly newsRepository: Repository<NewsEntity>,
  ) {}

  create(createNewsDto: CreateNewsDto) {
    // As per the plan, createdBy is not handled here.
    // This will likely fail at runtime if createdBy is a non-nullable column.
    const news = this.newsRepository.create(createNewsDto);
    return this.newsRepository.save(news);
  }

  findAll() {
    return this.newsRepository.find();
  }

  async findOne(id: string) {
    const news = await this.newsRepository.findOneBy({ id });
    if (!news) {
      throw new NotFoundException(`News article with ID "${id}" not found`);
    }
    return news;
  }

  async update(id: string, updateNewsDto: UpdateNewsDto) {
    const news = await this.findOne(id);
    Object.assign(news, updateNewsDto);
    return this.newsRepository.save(news);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.newsRepository.delete(id);
    return {
      message: `News article with ID "${id}" has been successfully deleted.`,
    };
  }
}
