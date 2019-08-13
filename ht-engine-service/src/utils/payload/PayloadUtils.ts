import * as Hapi from "hapi";
import * as _ from "lodash";

import { Model } from "sequelize-typescript";

import { Params } from "./Params";
import { PayloadOptions } from "./PayloadOptions";

export class PayloadUtils {

    public static paramsUsingModel<T extends Model<T>>(
        request: Hapi.Request,
        model: T | T[],
        options?: PayloadOptions,
    ): Params {

        const key = _.camelCase(model.constructor.name) + "Id";
        return { id: request.params[key] };
    }
}
