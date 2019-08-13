/*
 * @Author: Michal Grman (mike@decent.ch)
 * @Date: 2018-03-08 05:30:20
 * @Last Modified by: Michal Grman (mike@decent.ch)
 * @Last Modified time: 2018-03-11 11:41:35
 */

import { ExposeError, ExposeLoading } from "../../utils/expose";
import { Session } from "./Session";

export interface SessionState extends ExposeError, ExposeLoading {
    data?: Session | null;
    token?: string;
}
