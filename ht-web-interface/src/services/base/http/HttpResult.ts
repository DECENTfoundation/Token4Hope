/*
 * @Author: Michal Grman (mike@decent.ch)
 * @Date: 2018-03-11 20:34:58
 * @Last Modified by: Michal Grman (mike@decent.ch)
 * @Last Modified time: 2018-03-11 20:36:23
 */

import { ResultPayload } from "../../../utils/data";

export interface HttpResult<T = null> extends ResultPayload<T> {
    status: number | string;
}
