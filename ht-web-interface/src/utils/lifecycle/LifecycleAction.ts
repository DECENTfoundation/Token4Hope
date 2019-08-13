/*
 * @Author: Michal Grman (mike@decent.ch)
 * @Date: 2018-03-08 05:30:20
 * @Last Modified by: Michal Grman (mike@decent.ch)
 * @Last Modified time: 2018-03-08 05:33:25
 */

import { Action } from "../redux";
import { LifecycleEvent } from "./LifecycleEvent";

export class LifecycleAction {
    public static dispose(): Action {
        return { type: LifecycleEvent.Dispose };
    }

    public static reset(): Action {
        return { type: LifecycleEvent.Reset };
    }
}
