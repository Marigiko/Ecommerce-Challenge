import { config } from 'dotenv';
import { resolve } from 'path';
import { getEnvPath } from '@helpers/env.helper';
import { DataSourceOptions } from 'typeorm';

const envFilePath: string = getEnvPath(
  resolve(__dirname, './envs'),
);
config({ path: envFilePath });

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',

  url: process.env.DATABASE_URL,

  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT
    ? parseInt(process.env.DATABASE_PORT, 10)
    : undefined,

  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,

  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/shared/database/migration/history/*.js'],

  logger: 'simple-console',
  synchronize: false,
  logging: true,
};
