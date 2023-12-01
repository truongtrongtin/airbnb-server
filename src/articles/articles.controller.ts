import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import FindOneParams from '../utils/findOneParams.js';
import { ArticlesService } from './articles.service.js';
import ArticleDto from './dto/article.dto.js';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  create(@Body() data: ArticleDto) {
    return this.articlesService.create(data);
  }

  @Get()
  getAll() {
    return this.articlesService.getAll();
  }

  @Get(':id')
  getById(@Param() { id }: FindOneParams) {
    return this.articlesService.getById(id);
  }

  @Put(':id')
  update(@Param() { id }: FindOneParams, @Body() data: ArticleDto) {
    return this.articlesService.update(id, data);
  }

  @Delete(':id')
  delete(@Param() { id }: FindOneParams) {
    return this.articlesService.delete(id);
  }
}
