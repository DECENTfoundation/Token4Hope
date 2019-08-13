import { Metadata } from "../../../utils/payload";
import { LimitCount } from "./LimitCount";

export interface RateLimiterData extends Metadata {
    value: LimitCount;
}
