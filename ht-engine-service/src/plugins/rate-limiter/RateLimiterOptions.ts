
import { RateLimiterRedisOptions } from "./RateLimiterRedisOptions";

export interface RateLimiterOptions {
    redis: RateLimiterRedisOptions;
    maximalRequests: number;
}
