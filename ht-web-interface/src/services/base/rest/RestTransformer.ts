/*
 * @Author: Michal Grman (mike@decent.ch)
 * @Date: 2018-03-11 20:34:58
 * @Last Modified by: Michal Grman (mike@decent.ch)
 * @Last Modified time: 2018-03-12 16:58:34
 */

import * as _ from "lodash";

import { classToPlain } from "class-transformer";

import { Payload, PayloadTransformer } from "../../../utils/data";
import { ObjectDefinition } from "../../../utils/foundation/class";

export class RestTransformer<Transformer> implements PayloadTransformer {

    constructor(
        private def?: ObjectDefinition<Transformer>,
    ) { }

    public toRemote<T extends Payload>(local?: T): T {

        if (!_.isNil(this.def)) {
            const transformer = new this.def(local);
            return classToPlain(transformer) as T;
        }

        return local;
    }
}
