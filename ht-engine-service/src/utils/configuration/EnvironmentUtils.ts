import * as _ from "lodash";
import { Environment } from "./Environment";

export class EnvironmentUtils {
    public static getEnvironment(): string {
        const environment = _.get(process.env, "NODE_ENV", "");
        return _.includes([
            Environment.Development,
            Environment.Staging,
            Environment.Test,
            Environment.Production,
        ], environment) ? `${environment}` : ((): string => { throw new Error(`Unsupported environment: ${environment}`); })();
    }

    public static includesEnvironment(value: Environment | Environment[]): boolean {
        const sources = _.isArray(value) ? value : [value];
        return _.includes(sources, this.getEnvironment());
    }

    public static getEnvironmentValue(value: string, delimenter: string = "."): string {
        const environment = this.getEnvironment();
        return (environment === Environment.Production) ? value : environment + delimenter + value;
    }
}
