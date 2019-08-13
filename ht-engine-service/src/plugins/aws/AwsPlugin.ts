
import * as Hapi from "hapi";

import { LoggerTag } from "../../utils/logger";
import { Plugin } from "../../utils/plugin";

import { AwsOptions } from "./AwsOptions";

export class AwsPlugin implements Hapi.PluginBase<AwsOptions>, Hapi.PluginNameVersion {

    public readonly name: string = Plugin.Aws;
    public readonly version: string = "1.0.0";
    public readonly dependencies: string[] = [Plugin.Assembly];

    private options: AwsOptions;

    public async register(server: Hapi.Server, options: AwsOptions): Promise<void> {

        this.options = options;

        server.expose({ getOptions: (): AwsOptions => this.options });
        server.log([LoggerTag.Info, LoggerTag.Aws], "Aws plugin registered successfully.");
    }
}
