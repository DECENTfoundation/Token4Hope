/*
 * @Author: Michal Grman (mike@decent.ch)
 * @Date: 2018-03-11 20:34:58
 * @Last Modified by: Michal Grman (mike@decent.ch)
 * @Last Modified time: 2018-03-11 20:35:37
 */

import { RestConfig } from "./RestConfig";

export interface RestConfigMap {
    [key: string]: RestConfig | string;
}
