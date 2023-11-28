import { Global, Module } from '@nestjs/common';
import { CamelCasePlugin, PostgresDialect } from 'kysely';
import pg, { PoolConfig } from 'pg';
import { Database } from './database.js';
import {
  ConfigurableDatabaseModule,
  DATABASE_OPTIONS,
} from './database.module-definition.js';

@Global()
@Module({
  exports: [Database],
  providers: [
    {
      provide: Database,
      inject: [DATABASE_OPTIONS],
      useFactory: (poolConfig: PoolConfig) => {
        const dialect = new PostgresDialect({
          pool: new pg.Pool(poolConfig),
        });

        return new Database({
          dialect,
          log: (event) => {
            if (event.level === 'query') {
              console.log(event.query.sql);
              console.log(event.query.parameters);
            }
          },
          plugins: [new CamelCasePlugin()],
        });
      },
    },
  ],
})
export class DatabaseModule extends ConfigurableDatabaseModule {}
