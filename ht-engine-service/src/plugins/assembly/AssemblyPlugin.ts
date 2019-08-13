import * as Hapi from "hapi";

import { Container, interfaces } from "inversify";
import { makeLoggerMiddleware } from "inversify-logger-middleware";

import { LoggerTag } from "../../utils/logger";
import { Plugin } from "../../utils/plugin";

import { AssemblyOptions } from "./AssemblyOptions";

export const container = new Container();

export class AssemblyPlugin implements Hapi.PluginBase<AssemblyOptions>, Hapi.PluginNameVersion {

    public readonly name: string = Plugin.Assembly;
    public readonly version: string = "1.0.0";

    public async register(server: Hapi.Server, options: AssemblyOptions): Promise<void> {

        if (options.debug) {

            const logger = makeLoggerMiddleware();
            container.applyMiddleware(logger);
        }

        container.bind(Hapi.Server).toConstantValue(server);
        container.load(...options.modules);

        server.expose({ getContainer: (): interfaces.Container => container });
        server.log([LoggerTag.Info, LoggerTag.Assembly], "Assembly plugin registered successfully.");
    }
}
