import { Expose } from "class-transformer";
import * as _ from "lodash";

import { AttributeDateAccess } from "../../access-control";
import { BaseDto } from "./BaseDto";

export abstract class BaseEntityDto extends BaseDto {

    @Expose()
    public id?: number | string;

    @Expose()
    public get createdAt(): Date {
        return _.get(this, AttributeDateAccess.Created);
    }

    @Expose()
    public get updatedAt(): Date {
        return _.get(this, AttributeDateAccess.Updated);
    }
}
