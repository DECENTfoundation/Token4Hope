import { ObjectDefinition } from "../../../../utils/foundation/class";
import { DataTransferObject } from "../../types/BaseDataTransferObjectTypes";
import { BaseDto } from "../BaseDto";

// tslint:disable-next-line:max-line-length
export function TransferObjectType<T extends BaseDto>(type: () => ObjectDefinition<T & DataTransferObject>): (target: any) => void {
    return (target: any) => {
        target.prototype.transferObjectType = type;
    };
}

export function TransferObjectEvent<Event>(event: Event): (target: any) => void {
    return (target: any) => {
        target.prototype.event = event;
    };
}
