/*
 * @Author: Michal Grman (mike@decent.ch)
 * @Date: 2018-03-08 05:30:20
 * @Last Modified by: Michal Grman (mike@decent.ch)
 * @Last Modified time: 2018-03-08 05:32:28
 */

import { PartialPayload } from "./PartialPayload";

export interface ListPayload<T extends PartialPayload> {
    offset?: number;
    limit?: number;
    count?: number;
    source: T[];
}
