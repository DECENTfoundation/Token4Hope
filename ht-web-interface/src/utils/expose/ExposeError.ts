/*
 * @Author: Michal Grman (mike@decent.ch)
 * @Date: 2018-03-08 05:30:20
 * @Last Modified by: Michal Grman (mike@decent.ch)
 * @Last Modified time: 2018-03-08 05:33:10
 */

import { PartialError } from "../error";

export interface ExposeError<T extends PartialError = PartialError> {
    error?: T | null;
}
