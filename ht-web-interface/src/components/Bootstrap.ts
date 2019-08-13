/*
 * @Author: Michal Grman (mike@decent.ch)
 * @Date: 2018-02-16 21:02:15
 * @Last Modified by: Michal Grman (mike@decent.ch)
 * @Last Modified time: 2018-03-10 12:32:55
 */

import { ContainerModule } from "inversify";

export const Bootstrap = (): ContainerModule => {
    return new ContainerModule((bind) => {
        // tslint:disable-next-line:no-console
        console.log("Component bootstrap registered");
    });
};
