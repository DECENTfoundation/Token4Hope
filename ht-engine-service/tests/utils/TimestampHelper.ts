import { BaseEntityDto } from "../../src/models/base/transfer-objects/BaseEntityDto";

export class TimestampHelper {

    public static updateTimestamps<T>(modelDto: BaseEntityDto, dataOut: any) {
        dataOut.createdAt = modelDto.createdAt;
        dataOut.updatedAt = modelDto.updatedAt;
    }

}
