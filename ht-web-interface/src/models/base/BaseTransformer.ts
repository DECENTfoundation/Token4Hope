import * as _ from "lodash";

import { Expose } from "class-transformer";

import { BaseModel } from "./BaseModel";

export class BaseTransformer implements BaseModel {

    @Expose()
    public id?: number | string;

    constructor(values?: any) {
        _.keys(values).forEach((k) => _.set(this, k, _.get(values, k)));
    }
}
