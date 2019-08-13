/*
 * @Author: Michal Grman (mike@decent.ch)
 * @Date: 2018-02-22 07:21:51
 * @Last Modified by: Michal Grman (mike@decent.ch)
 * @Last Modified time: 2018-02-22 07:22:34
 */

export const ObjectCheckOf = <T>(object: any, property: string): object is T => {
    return property in object;
};
