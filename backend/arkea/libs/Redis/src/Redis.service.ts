import { Injectable } from '@nestjs/common';

import { RedisRepository } from './Redis.repository';
import { ValueOrPromise } from './Redis.repository.types';

@Injectable()
export class RedisService<K extends string, T> {
  constructor (
    private readonly _repo: RedisRepository<Record<K, T>>,
  ) { }

  async getOrSetCacheData (key: K, callback?: () => ValueOrPromise<T>): Promise<T> {
    return this._repo.getOrSetCacheData(key, callback);
  }

  async setCacheData (key: K, value: T): Promise<T> {
    return this._repo.setCacheData(key, value);
  }

  async getAllKeysFromCache (substring?: string): Promise<string[]> {
    return this._repo.getAllKeysFromCache(substring);
  }

  async removeEntriesFromCache (keys?: K[]): Promise<string[]> {
    return this._repo.removeEntriesFromCache(keys);
  }
}