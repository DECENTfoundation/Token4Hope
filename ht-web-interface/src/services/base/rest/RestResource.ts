/*
 * @Author: Michal Grman (mike@decent.ch)
 * @Date: 2018-03-11 20:34:58
 * @Last Modified by: Michal Grman (mike@decent.ch)
 * @Last Modified time: 2018-03-11 20:35:23
 */

import { BaseModel } from "../../../models/base/BaseModel";
import { Payload } from "../../../utils/data";

import { RestPath } from "./RestPath";

export type RestResource<T extends Payload> = (BaseModel | T) | Array<(BaseModel | T)> | RestPath;
