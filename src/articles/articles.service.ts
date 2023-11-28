import { Injectable, NotFoundException } from '@nestjs/common';
import { ArticlesRepository } from './articles.repository.js';
import ArticleDto from './dto/article.dto.js';

@Injectable()
export class ArticlesService {
  constructor(private readonly articlesRepository: ArticlesRepository) {}

  getAll() {
    return this.articlesRepository.getAll();
  }

  async getById(id: string) {
    const article = await this.articlesRepository.getById(id);

    if (!article) {
      throw new NotFoundException();
    }

    return article;
  }

  async create(data: ArticleDto) {
    return this.articlesRepository.create(data);
  }

  async update(id: string, data: ArticleDto) {
    const article = await this.articlesRepository.update(id, data);

    if (!article) {
      throw new NotFoundException();
    }

    return article;
  }
}
