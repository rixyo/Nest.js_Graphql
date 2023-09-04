/**
 * Module for data source. It exports the data source providers.
 * It will be used in the other modules to connect to the database.
 */
import { Module } from '@nestjs/common';
import { dataSourceProviders } from './datasource.provider';

@Module({
  providers: [...dataSourceProviders],
  exports: [...dataSourceProviders],
})
export class DataSourceModule {}
