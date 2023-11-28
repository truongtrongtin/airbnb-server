import { ConfigurableModuleBuilder } from '@nestjs/common';
import { PoolConfig } from 'pg';

export const {
  ConfigurableModuleClass: ConfigurableDatabaseModule,
  MODULE_OPTIONS_TOKEN: DATABASE_OPTIONS,
} = new ConfigurableModuleBuilder<PoolConfig>()
  .setClassMethodName('forRoot')
  .build();
