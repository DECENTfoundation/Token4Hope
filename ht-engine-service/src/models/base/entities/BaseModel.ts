import { plainToClass } from "class-transformer";
import { Model } from "sequelize-typescript";

import { AttributeDateAccess } from "../../access-control";
import { BaseDto } from "../transfer-objects/BaseDto";
import { DataTransferObjectConstructor, DataTransferTypeOfModel } from "../types/BaseDataTransferObjectTypes";

export abstract class BaseModel<T extends Model<T>> extends Model<T> implements DataTransferTypeOfModel {

    protected transferObjectType: DataTransferObjectConstructor;

    public toTransferObject<U extends BaseDto>(): U {
        return plainToClass<U, {}>(this.transferObjectType(), this.get({ plain: true }), {
            excludePrefixes: [AttributeDateAccess.Deleted], ignoreDecorators: true,
        });
    }
}
