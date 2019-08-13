import { ClassTransformOptions } from "class-transformer";
import { BaseOperation } from "dcorejs-sdk";

import { KeystoreStrategy } from "../../../plugins/keystore";

import { ObjectDefinition } from "../../../utils/foundation/class";
import { Message, Payload } from "../../../utils/payload";
import { BaseDto } from "../transfer-objects/BaseDto";

export interface DataTransferObject extends KeystoreStrategy {
    toPayload(options?: ClassTransformOptions): Payload;
    merge?(payload: Payload, options?: ClassTransformOptions): this;
    toMessage?<Event = any>(event?: Event, options?: ClassTransformOptions): Message<Event>;

    toPulblishOperation?(...args: any[]): BaseOperation;
    toUnpublishOperation?(...args: any[]): BaseOperation;
    toTransferOperation?(...args: any[]): BaseOperation;
}

export type DataTransferObjectConstructor = <U extends BaseDto>() => ObjectDefinition<U> & DataTransferObject;

export interface DataTransferTypeOfModel {
    toTransferObject<U extends BaseDto>(): U;
}
