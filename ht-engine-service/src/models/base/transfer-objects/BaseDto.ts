import * as _ from "lodash";

import { classToPlain, ClassTransformOptions, plainToClass, plainToClassFromExist } from "class-transformer";
import { BaseOperation } from "dcorejs-sdk";
import { ObjectDefinition } from "../../../utils/foundation/class";
import { Payload } from "../../../utils/payload";

import { AttributeAccess, AttributeAccessSet } from "../../access-control";
import { DataTransferObject } from "../types/BaseDataTransferObjectTypes";

export abstract class BaseDto implements DataTransferObject {

    protected event?: any;

    public toPayload(options?: ClassTransformOptions): Payload {
        return classToPlain(this, {
            ...options, excludePrefixes: [
                AttributeAccess.Event, ...AttributeAccessSet.Dates,
                ...(!_.isNil(options) && !_.isNil(options.excludePrefixes) ? options.excludePrefixes : []),
            ],
        });
    }

    public toPublishOperation(...args: any[]): BaseOperation {
        return null;
    }

    public toUnpublishOperation(...args: any[]): BaseOperation {
        return null;
    }

    public toTransferOperation(...args: any[]): BaseOperation {
        return null;
    }

    public merge(payload: Payload, options?: ClassTransformOptions): this {
        return plainToClassFromExist(this, payload, { ignoreDecorators: true, ...options });
    }

    // tslint:disable-next-line:max-line-length
    protected fork<T extends BaseDto>(def: ObjectDefinition<T>, merge: boolean = true, payload?: Payload, options?: ClassTransformOptions): T {
        // tslint:disable-next-line:max-line-length
        return plainToClass<T, {}>(def, { ...(merge ? this.toPayload({ ignoreDecorators: true }) : null), ...payload }, { ...options, ignoreDecorators: true });
    }
}
