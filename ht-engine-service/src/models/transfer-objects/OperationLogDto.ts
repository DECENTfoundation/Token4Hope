import { Expose } from "class-transformer";

import { Sealed } from "../../utils/foundation/class/decorators";
import { BaseEntityDto } from "../base/transfer-objects/BaseEntityDto";

@Sealed
export class OperationLogDto extends BaseEntityDto {

    @Expose()
    public objectId: string;

    @Expose()
    public objectName: string;

    @Expose()
    public operation: string;
}
