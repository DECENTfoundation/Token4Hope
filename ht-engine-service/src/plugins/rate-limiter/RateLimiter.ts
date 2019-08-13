
import * as Catbox from "catbox";
import { RateLimiterOptions } from "./RateLimiterOptions";
import { RateLimiterPool } from "./RateLimiterPool";

export interface RateLimiter {
    flush(): void;
    getOptions(): RateLimiterOptions;
    getPool(pool: RateLimiterPool): Catbox.Policy;
}
