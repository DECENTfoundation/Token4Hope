import { assert } from "chai";
import { ClassTransformOptions } from "class-transformer";
import { Model } from "sequelize-typescript";

import { DataTransferTypeOfModel } from "../../src/models/base/types/BaseDataTransferObjectTypes";

export class AssertationHelper {
    public static assert<T extends Model<T> & DataTransferTypeOfModel>(model: T, plain: any, options?: ClassTransformOptions): void {
        assert.deepEqual(model.toTransferObject().toPayload(options), plain);
    }
}
