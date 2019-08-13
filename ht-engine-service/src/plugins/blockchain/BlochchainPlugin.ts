import * as Hapi from "hapi";

import { LoggerTag } from "../../utils/logger";
import { Plugin } from "../../utils/plugin";

import { BlockchainOptions } from "./BlockchainOptions";

export class BlockchainPlugin implements Hapi.PluginBase<BlockchainOptions>, Hapi.PluginNameVersion {

    public readonly name: string = Plugin.Blockchain;
    public readonly version: string = "1.0.0";
    public readonly dependencies: string[] = [Plugin.Assembly, Plugin.Auth, Plugin.Orm];

    private options: BlockchainOptions;

    public async register(server: Hapi.Server, options: BlockchainOptions): Promise<void> {

        this.options = options;

        server.expose({
            getOptions: (): BlockchainOptions => this.options,
        });

        server.log([LoggerTag.Info, LoggerTag.Blockchain], `Blockchain plugin registered successfully.`);
    }
}
