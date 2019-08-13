
import * as Catbox from "catbox";
import * as Hapi from "hapi";
import * as _ from "lodash";

import { LoggerTag } from "../../utils/logger";
import { Plugin } from "../../utils/plugin";

import { SessionOptions } from "./SessionOptions";
import { SessionPoolPolicy } from "./SessionPoolPolicy";

export class SessionPlugin implements Hapi.PluginBase<SessionOptions>, Hapi.PluginNameVersion {

    public readonly name: string = Plugin.Session;
    public readonly version: string = "1.0.0";
    public readonly dependencies: string[] = [Plugin.Assembly];

    private session: Catbox.Client;
    private options: SessionOptions;
    private pools: Map<SessionPoolPolicy, Catbox.Policy> = new Map();

    public async register(server: Hapi.Server, options: SessionOptions): Promise<void> {

        this.options = options;
        this.session = new Catbox.Client(require("catbox-redis"), { ...options });

        [SessionPoolPolicy.User].forEach((pool) => this.pools.set(
            pool, new Catbox.Policy(options.pools[pool], this.session, pool),
        ));

        await this.session.start();

        server.expose({
            flush: () => {
                const { Command } = require("ioredis");
                const command = new Command("flushdb", [], "utf8", (error: any, result: any) => {
                    if (!_.isNil(error)) {
                        server.log([LoggerTag.Error, LoggerTag.Session], `Session flushed with error ${error}.`);
                    }
                });
                const client = _.get(this.session, "connection.client");
                client.sendCommand(command);
            },
            getOptions: () => this.options,
            getPool: (pool: SessionPoolPolicy): Catbox.Policy => this.pools.get(pool),
        });
        server.log([LoggerTag.Info, LoggerTag.Session], "Session plugin registered successfully.");
    }
}
