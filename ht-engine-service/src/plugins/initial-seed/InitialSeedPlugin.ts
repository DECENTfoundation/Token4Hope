
import * as Hapi from "hapi";

import { LoggerTag } from "../../utils/logger";
import { Plugin } from "../../utils/plugin";
import { lazyInject } from "../assembly/decorators";
import { InitialSeedFactory } from "./InitialSeedFactory";
import { InitialSeedOptions } from "./InitialSeedOptions";

export class InitialSeedPlugin implements Hapi.PluginBase<InitialSeedOptions>, Hapi.PluginNameVersion {

    public readonly name: string = Plugin.InitialSeed;
    public readonly version: string = "1.0.0";
    public readonly dependencies: string[] = [Plugin.Assembly];

    private options: InitialSeedOptions;

    @lazyInject("Factory<InitialSeedExecuter>")
    private executer: InitialSeedFactory;

    public async register(server: Hapi.Server, options: InitialSeedOptions): Promise<void> {

        this.options = options;

        server.expose({ getOptions: (): InitialSeedOptions => this.options });

        await Promise.all(this.options.initialSeeds.map(async ($) => await this.executer($.service).execute($.seedData)));

        server.log([LoggerTag.Info, LoggerTag.InitialSeed], "InitialSeed plugin registered successfully.");
    }
}
