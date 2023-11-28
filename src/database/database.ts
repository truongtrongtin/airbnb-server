import { Kysely } from 'kysely';
import { ArticleTable } from '../articles/articleTable.js';

interface Tables {
  article: ArticleTable;
}

export class Database extends Kysely<Tables> {}
