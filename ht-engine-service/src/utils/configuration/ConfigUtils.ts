import * as _ from "lodash";
import * as Path from "path";

import { Options } from "../foundation";
import { ConfigOptions } from "./ConfigOptions";
import { EnvironmentUtils } from "./EnvironmentUtils";

export class ConfigUtils {

    public static root: string = Path.resolve(__dirname, "../../../");

    public static resolve<T = Options>(configuration: string, options?: ConfigOptions): T {

        const opt = { use: false, ext: "js", ...options };
        let config = require(`${ConfigUtils.root}/config/${configuration}.${opt.ext}`) as T;

        if (opt.use) {
            const environment = EnvironmentUtils.getEnvironment();

            if (!_.isEmpty(environment)) {
                config = _.get(config, environment, null);
                if (_.isNull(config)) {
                    throw new Error(`Server configuration failed in ${environment}`);
                }
            }
        }
        return config;
    }
}
