import { Injectable } from '@nestjs/common';
import { Database } from '../database/database.js';
import ArticleDto from './dto/article.dto.js';

@Injectable()
export class ArticlesRepository {
  constructor(private readonly database: Database) {}

  async getAll() {
    const query = this.database.selectFrom('article');
    return await query.selectAll().execute();
  }

  async getById(id: string) {
    const databaseResponse = await this.database
      .selectFrom('article')
      .where('id', '=', id)
      .selectAll()
      .executeTakeFirst();

    return databaseResponse;
  }

  async create(data: ArticleDto) {
    const now = new Date();
    const databaseResponse = await this.database
      .insertInto('article')
      .values({
        title: data.title,
        content: data.content,
        createdAt: now,
        updatedAt: now,
      })
      .returningAll()
      .executeTakeFirst();

    return databaseResponse;
  }

  async update(id: string, data: ArticleDto) {
    const now = new Date();
    const databaseResponse = await this.database
      .updateTable('article')
      .set({
        title: data.title,
        content: data.content,
        updatedAt: now,
      })
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirst();

    return databaseResponse;
  }

  async delete(id: string) {
    const databaseResponse = await this.database
      .deleteFrom('article')
      .where('id', '=', id)
      .executeTakeFirst();

    return databaseResponse;
  }
}
