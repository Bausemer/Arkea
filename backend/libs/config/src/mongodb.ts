import { MongooseModuleOptions } from '@nestjs/mongoose';

import { getEnvVariables } from './helpers';

const mongoDBQuery = {
  authSource: 'admin',
  readPreference: 'primary',
  directConnection: true,
  ssl: false
};

/** */
export function getConnection (): [string, MongooseModuleOptions] {
  const env = getEnvVariables();

  const user = `${env.MONGODB_ROOT_USER}:${env.MONGODB_ROOT_PASSWORD}`;
  const host = `${env.MONGODB_HOST}:${env.MONGODB_PORT}`;
  const queryString: string = Object.entries(mongoDBQuery)
    .reduce((t, [key, value], i) => `${t}${i ? '&' : ''}${key}=${value}`, '?');

  const connectionString = `mongodb://${user}@${host}/${queryString}`;
  const options = { dbName: env.MONGODB_DB_DATABASE }
  
  console.log(connectionString)

  return [connectionString, options];
}
