/*
 * @Author: Michal Grman (mike@decent.ch)
 * @Date: 2018-03-08 05:30:20
 * @Last Modified by: Michal Grman (mike@decent.ch)
 * @Last Modified time: 2018-03-11 11:46:08
 */

import { SessionState } from "./SessionState";

export interface SessionStateMap {
    [key: string]: () => SessionState;
}
