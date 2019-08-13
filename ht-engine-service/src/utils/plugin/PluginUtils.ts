import * as Hapi from "hapi";
import * as _ from "lodash";

import { ObjectCheckOf, ObjectDefinition } from "../foundation/class";

import { Plugin } from "./Plugin";

type ServiceDefinition<Options> = string | ObjectDefinition<Hapi.Plugin<Options>>;

export class PluginUtils {

    public static bootstrap<Options>(
        service: ServiceDefinition<Options>,
        options: Options,
    ): Hapi.ServerRegisterPluginObject<Options> {
        return { options, plugin: (_.isString(service)) ? require(service) : (new service()) };
    }

    public static resolve<Service>(source: Hapi.Server | Hapi.Request, identity: Plugin): Service {

        if (ObjectCheckOf<Hapi.Request>(source, "server")) {
            return _.get(source.server.plugins, identity, null);
        }

        return _.get(source.plugins, identity, null);
    }
}
