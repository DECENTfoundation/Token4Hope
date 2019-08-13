import "reflect-metadata";
import { ServerBootstrap } from "./server/Bootstrap";
import { LoggerTag } from "./utils/logger";

((async () => {
    const server = await ServerBootstrap();
    await server.start();
    server.log([LoggerTag.Info, LoggerTag.Hapi], `Server started at: ${server.info.uri}, port: ${server.info.port}.`);
})());
