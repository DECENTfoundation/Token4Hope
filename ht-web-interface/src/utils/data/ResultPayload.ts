/*
 * @Author: Michal Grman (mike@decent.ch)
 * @Date: 2018-03-08 05:30:20
 * @Last Modified by: Michal Grman (mike@decent.ch)
 * @Last Modified time: 2018-03-09 21:16:26
 */

import { PartialError } from "../error";
import { ListPayload } from "./ListPayload";
import { PartialPayload } from "./PartialPayload";

export interface ResultPayload<T extends PartialPayload, E extends PartialError = PartialError> {
    data?: T | ListPayload<T>;
    error?: E;
}
