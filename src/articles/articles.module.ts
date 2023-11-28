import { Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller.js';
import { ArticlesRepository } from './articles.repository.js';
import { ArticlesService } from './articles.service.js';

@Module({
  imports: [],
  controllers: [ArticlesController],
  providers: [ArticlesRepository, ArticlesService],
})
export class ArticlesModule {}
