/*
 * @Author: Michal Grman (mike@decent.ch)
 * @Date: 2018-03-11 20:34:58
 * @Last Modified by: Michal Grman (mike@decent.ch)
 * @Last Modified time: 2018-03-12 16:58:34
 */

import { Payload } from "./Payload";

export interface PayloadTransformer {
    toRemote<T extends Payload>(local?: T): T;
}
