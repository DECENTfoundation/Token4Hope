import * as Hapi from "hapi";

import { AssemblyPlugin } from "../plugins/assembly";
import { AuthPlugin } from "../plugins/auth";
import { AwsPlugin } from "../plugins/aws";
import { BlockchainPlugin } from "../plugins/blockchain";
import { OrmPlugin } from "../plugins/orm";
import { RouterPlugin } from "../plugins/router";
import { SessionPlugin } from "../plugins/session";

import { ConfigUtils } from "../utils/configuration";
import { LoggerTag } from "../utils/logger";
import { Plugin, PluginUtils } from "../utils/plugin";

import { Bootstrap as ControllersModule } from "../controllers/Bootstrap";
import { Bootstrap as ModelsModule } from "../models/Bootstrap";
import { Bootstrap as PluginsModule } from "../plugins/Bootstrap";
import { InitialSeedPlugin } from "../plugins/initial-seed/InitialSeedPlugin";
import { RateLimiterPlugin } from "../plugins/rate-limiter/RateLimiterPlugin";
import { Bootstrap as ServicesModule } from "../services/Bootstrap";

export const ServerBootstrap = async (): Promise<Hapi.Server> => {

    const server = new Hapi.Server({
        ...ConfigUtils.resolve("server", { use: true }),
        cache: [{
            ...ConfigUtils.resolve("cache", { use: true }), engine: require("catbox-redis"),
        }],
    });

    try {
        await server.register([
            PluginUtils.bootstrap(Plugin.Logger, { ...ConfigUtils.resolve("logger", { ext: "json" }) }),
            PluginUtils.bootstrap(AssemblyPlugin, {
                ...ConfigUtils.resolve("assembly", { ext: "json" }),
                modules: [
                    ...ModelsModule(),
                    ControllersModule(),
                    PluginsModule(),
                    ServicesModule(),
                ],
            }),
            PluginUtils.bootstrap(AwsPlugin, { ...ConfigUtils.resolve("aws", { use: true }) }),
            PluginUtils.bootstrap(OrmPlugin, { ...ConfigUtils.resolve("datastore", { use: true }) }),
            PluginUtils.bootstrap(SessionPlugin, { ...ConfigUtils.resolve("session", { use: true }) }),
            PluginUtils.bootstrap(AuthPlugin, { ...ConfigUtils.resolve("authentication") }),
            PluginUtils.bootstrap(RouterPlugin, { ...ConfigUtils.resolve("router") }),
            PluginUtils.bootstrap(BlockchainPlugin, { ...ConfigUtils.resolve("blockchain", { use: true }) }),
            PluginUtils.bootstrap(RateLimiterPlugin, { ...ConfigUtils.resolve("ratelimiter", { use: true }) }),
            PluginUtils.bootstrap(InitialSeedPlugin, { ...ConfigUtils.resolve("initialseed", { use: true }) }),
        ]);
        server.log([LoggerTag.Info, LoggerTag.Hapi], `Plugins initialized successfully`);
    } catch (error) {
        server.log([LoggerTag.Error, LoggerTag.Hapi], `Plugins failed to register with error: ${error.stack}`);
    }
    return server;
};
