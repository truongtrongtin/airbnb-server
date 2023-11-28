import { ColumnType, Generated } from 'kysely';

export interface BaseTable {
  id: Generated<string>;
  createdAt: ColumnType<string, string | Date, never>;
  updatedAt: ColumnType<string, string | Date, string | Date>;
}
