import { BaseTable } from 'src/database/baseTable.js';

export interface ArticleTable extends BaseTable {
  title: string;
  content: string;
}
