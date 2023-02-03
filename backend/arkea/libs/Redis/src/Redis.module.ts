import * as redisStore from 'cache-manager-redis-store';

import { CacheModule, DynamicModule, Module } from '@nestjs/common';

import { IRedisConfig } from './Redis.config';
import { RedisRepository } from './Redis.repository';
import { RedisService } from './Redis.service';

const DEFAULT_PORT = 6379;
const DEFAULT_HOST = 'localhost';
const SECONDS_IN_1H = 3_600; // time-to-live: 60 min

@Module({
  providers: [
    RedisRepository,
    RedisService
  ],
  exports: [
    RedisService
  ]
})
export class RedisModule {
  static forRoot (config?: IRedisConfig): DynamicModule {
    if (process.env.REDIS_PORT) 
      console.log(`Using default "REDIS_PORT" as ${DEFAULT_PORT}.`);
    
    return {
      module: RedisModule,
      imports: [
        CacheModule.register({
          store: redisStore,
          host: process.env.REDIS_HOST || DEFAULT_HOST,
          port: +process.env.REDIS_PORT || DEFAULT_PORT,
          ttl: config?.ttl || SECONDS_IN_1H
        })
      ]
    }
  }
}