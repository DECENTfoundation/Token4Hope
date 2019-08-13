/*
 * @Author: Michal Grman (mike@decent.ch)
 * @Date: 2018-02-16 21:02:15
 * @Last Modified by: Michal Grman (mike@decent.ch)
 * @Last Modified time: 2018-03-10 07:21:43
 */

import { Params } from "./Params";
import { ParamsTransformer } from "./ParamsTransformer";

export type ParamsFactory = (params?: Params) => ParamsTransformer;
