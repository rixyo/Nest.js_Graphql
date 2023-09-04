/**
 * This file is used to create a connection to the database.
 * due to dev env we are using a local database, that's why we don't need to use the env variables.
 */
import { DataSource } from 'typeorm';
export const dataSourceProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      try {
        const dataSource = new DataSource({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'roixy',
          password: 'mysecret',
          database: 'students-db',
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          synchronize: true,
          cache: true,
        });

        return dataSource.initialize();
      } catch (error) {
        console.log(error);
      }
    },
  },
];
