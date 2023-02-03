import { Cache } from 'cache-manager';

import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';

import { ValueOrPromise } from './Redis.repository.types';

import type { CacheValue } from './Redis.repository.types';


@Injectable()
export class RedisRepository<C extends { [Key in string]: any }> {
  constructor (
    @Inject(CACHE_MANAGER) private readonly _cacheManager: Cache,
  ) { }

  async getOrSetCacheData<K extends keyof C> (key: K, callback: () => ValueOrPromise<C[K]>): Promise<C[K]> {
    return new Promise((resolve, reject) => {
      this._cacheManager.get<string>(key.toString(), async (error, value) => {
        if (error) return reject(error);

        if (value) {
          const { data }: CacheValue<C[keyof C]> = JSON.parse(value);
          resolve(data);
        } else if (callback) {
          const data = await callback();
          const cacheValue = { data, addedToCacheAt: Date.now() };
          this._cacheManager.set(key.toString(), JSON.stringify(cacheValue), { ttl: 0 });
          resolve(data);
        }

        reject(new Error(''));
      });
    });
  }

  async setCacheData<K extends keyof C> (key: K, value: C[K]): Promise<C[K]> {
    return new Promise(async (resolve) => {
      const cacheValue = { data: value, addedToCacheAt: Date.now() };
      await this._cacheManager.set(key.toString(), JSON.stringify(cacheValue), { ttl: 0 });
      resolve(value);
    });
  }

  async getAllKeysFromCache (substring?: string): Promise<(keyof C)[]> {
    return this._cacheManager.store.keys?.(substring) || [];
  }

  async removeEntriesFromCache (keys?: (keyof C)[]): Promise<(keyof C)[]> {
    keys ||= await this.getAllKeysFromCache();

    await Promise.all(keys.map((key) => this._cacheManager.del(key.toString())));

    return keys;
  }
}