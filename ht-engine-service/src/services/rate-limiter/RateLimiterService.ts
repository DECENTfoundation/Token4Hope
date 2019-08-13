import * as Catbox from "catbox";
import * as Hapi from "hapi";
import * as _ from "lodash";

import { inject, injectable } from "inversify";

import { RateLimiterFactory, RateLimiterOptions, RateLimiterPool } from "../../plugins/rate-limiter";

import { RateLimiterData } from "./artifacts";

@injectable()
export class RateLimiterService {

    @inject("Factory<RateLimiter>")
    private rateLimiterFactory: RateLimiterFactory;

    public async validate(request: Hapi.Request) {
        let data = await this.getRateLimiter(request) as RateLimiterData;

        if (_.isNil(data)) {
            data = { value: { count: 0 } };
        }

        if (data.value.count > this.getRateLimiterOptions(request).maximalRequests) {
            return false;
        }

        data.value.count++;

        await this.create(request, data);

        return true;
    }

    public async create(request: Hapi.Request, data: RateLimiterData, ttl: number = 0): Promise<void> {
        this.getRateLimiterPool(request).set(this.getKey(request), data, ttl);
    }

    public async delete(request: Hapi.Request): Promise<void> {
        return await this.getRateLimiterPool(request).drop(this.getKey(request));
    }

    public async getRateLimiter(request: Hapi.Request): Promise<Catbox.PolicyGetPromiseResult> {
        return await this.getRateLimiterPool(request).get(this.getKey(request));
    }

    protected getRateLimiterPool(request: Hapi.Request): Catbox.Policy {
        return this.rateLimiterFactory(request).getPool(RateLimiterPool.RateLimiter);
    }

    protected getRateLimiterOptions(request: Hapi.Request): RateLimiterOptions {
        return this.rateLimiterFactory(request).getOptions();
    }

    protected flush(request: Hapi.Request): void {
        return this.rateLimiterFactory(request).flush();
    }

    private getIp(request: Hapi.Request) {
        return request.headers["x-forwarded-for"] || request.info.remoteAddress;
    }

    private getKey(request: Hapi.Request) {
        return request.route.settings.id + ":" + this.getIp(request);
    }
}
