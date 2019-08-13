
import * as Catbox from "catbox";
import * as Hapi from "hapi";
import * as _ from "lodash";

import { LoggerTag } from "../../utils/logger";
import { Plugin } from "../../utils/plugin";

import { RateLimiterOptions } from "./RateLimiterOptions";
import { RateLimiterPool } from "./RateLimiterPool";

export class RateLimiterPlugin implements Hapi.PluginBase<RateLimiterOptions>, Hapi.PluginNameVersion {

    public readonly name: string = Plugin.RateLimiter;
    public readonly version: string = "1.0.0";
    public readonly dependencies: string[] = [Plugin.Assembly];

    private rateLimiter: Catbox.Client;
    private options: RateLimiterOptions;
    private pools: Map<RateLimiterPool, Catbox.Policy> = new Map();

    public async register(server: Hapi.Server, options: RateLimiterOptions): Promise<void> {

        this.options = options;
        this.rateLimiter = new Catbox.Client(require("catbox-redis"), { ...options.redis });

        this.pools.set(
            RateLimiterPool.RateLimiter,
            new Catbox.Policy(options.redis.pools[RateLimiterPool.RateLimiter], this.rateLimiter, RateLimiterPool.RateLimiter),
        );

        await this.rateLimiter.start();

        server.expose({
            flush: () => {
                const { Command } = require("ioredis");
                const command = new Command("flushdb", [], "utf8", (error: any, result: any) => {
                    if (!_.isNil(error)) {
                        server.log([LoggerTag.Error, LoggerTag.RateLimiter], `RateLimiter flushed with error ${error}.`);
                    }
                });
                const client = _.get(this.rateLimiter, "connection.client");
                client.sendCommand(command);
            },
            getOptions: () => this.options,
            getPool: (pool: RateLimiterPool): Catbox.Policy => this.pools.get(pool),
        });
        server.log([LoggerTag.Info, LoggerTag.RateLimiter], "RateLimiter plugin registered successfully.");
    }
}
