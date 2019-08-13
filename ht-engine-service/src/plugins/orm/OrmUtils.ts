
import * as Hapi from "hapi";
import * as _ from "lodash";

import { Payload } from "../../utils/payload";
import { OrmDefaults } from "./OrmDefaults";

export class OrmUtils {

    public static limitOffset(source: Hapi.Request) {
        const payload = source.query as Payload;

        return {
            limit: _.isNil(payload.limit) ? OrmDefaults.Limit : payload.limit,
            offset: _.isNil(payload.offset) ? OrmDefaults.Offset : payload.offset,
        };
    }
}
