/*
 * @Author: Michal Grman (mike@decent.ch)
 * @Date: 2018-03-11 20:34:58
 * @Last Modified by: Michal Grman (mike@decent.ch)
 * @Last Modified time: 2018-03-11 20:35:19
 */

import * as _ from "lodash";

import { BaseModel } from "../../../models/base/BaseModel";
import { Payload } from "../../../utils/data";

import { RestPath } from "./RestPath";
import { RestResource } from "./RestResource";

export class RestRoute<T extends Payload> {

    private route: string;

    constructor(
        pattern: string,
        resource: RestResource<T>,
    ) {
        this.route = (resource === RestPath.Pattern) ? pattern : this.create(pattern, resource);
    }

    public toString(): string {
        return this.route;
    }

    private create(pattern: string, resource: (BaseModel | T) | Array<(BaseModel | T)>): string {

        const regex = /\B\:\w*/g;
        const resources = this.sanitize(resource);
        return pattern.replace(regex, (substring: string, ...args: any[]) => {

            const r = resources.shift();
            const key = substring.substr(1);

            return `${r[key]}`;
        });
    }

    private sanitize(resource: RestResource<T>): Array<BaseModel | T> {
        return _.isArray(resource) ? resource : [resource] as Array<BaseModel | T>;
    }
}
