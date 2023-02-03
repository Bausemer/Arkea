export interface IRedisConfig {
  /** Time to live - amount of time in seconds that a response is cached before it is deleted. */
  ttl?: number;
}