export type CacheValue<T> = {
  data: T,
  addedToCacheAt: Date,
};

export type ValueOrPromise<T> = T | Promise<T>;