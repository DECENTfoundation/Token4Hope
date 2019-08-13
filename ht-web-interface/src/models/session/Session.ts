/*
 * @Author: Michal Grman (mike@decent.ch)
 * @Date: 2018-03-08 05:30:20
 * @Last Modified by: Michal Grman (mike@decent.ch)
 * @Last Modified time: 2018-03-11 11:55:24
 */

import { Payload } from "../../utils/data";

export interface Session extends Payload {
    email?: string;
    password?: string;
}
