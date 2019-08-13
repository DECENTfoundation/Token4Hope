/*
 * @Author: Michal Grman (mike@decent.ch)
 * @Date: 2018-03-11 20:34:58
 * @Last Modified by: Michal Grman (mike@decent.ch)
 * @Last Modified time: 2018-03-11 21:09:18
 */

import { ObjectDefinition } from "../../../../utils/foundation/class";

import { RestAuth } from "../RestAuth";
import { RestConfig } from "../RestConfig";
import { RestGateway } from "../RestGateway";
import { RestTransformer } from "../RestTransformer";

export function Rest<Transformer = null>(options: {
    authorized?: RestAuth;
    gateway?: RestGateway;
    transformer?: ObjectDefinition<Transformer>
    routes: {
        [key: string]: RestConfig | string;
    },
}): (target: any) => void {
    return (target: any) => {
        target.prototype.authorized = options.authorized || RestAuth.None;
        target.prototype.routes = options.routes;
        target.prototype.transformer = new RestTransformer(options.transformer);
        target.prototype.gateway = options.gateway;
    };
}
