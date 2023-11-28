import { Kysely, sql } from 'kysely';

export async function up(database: Kysely<unknown>): Promise<void> {
  await database.schema
    .createTable('article')
    .addColumn('id', 'uuid', (column) =>
      column.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn('title', 'text', (column) => column.notNull())
    .addColumn('content', 'text', (column) => column.notNull())
    .addColumn('createdAt', 'timestamp', (column) => column.notNull())
    .addColumn('updatedAt', 'timestamp', (column) => column.notNull())
    .execute();
}

export function down(database: Kysely<unknown>) {
  database.schema.dropTable('article');
}
