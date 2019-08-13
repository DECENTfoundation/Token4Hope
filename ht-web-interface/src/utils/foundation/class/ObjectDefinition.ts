/*
 * @Author: Michal Grman (mike@decent.ch)
 * @Date: 2018-02-22 06:16:57
 * @Last Modified by:   Michal Grman (mike@decent.ch)
 * @Last Modified time: 2018-02-22 06:16:57
 */

// tslint:disable-next-line:interface-over-type-literal
export type ObjectDefinition<T> = { new(...args: any[]): T };
