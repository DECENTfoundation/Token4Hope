import * as Hapi from "hapi";
import { RateLimiter } from "./RateLimiter";

export type RateLimiterFactory = (source: Hapi.Server | Hapi.Request) => RateLimiter;
