import { Expose } from "class-transformer";

import { Sealed } from "../../utils/foundation/class/decorators";
import { BaseEntityDto } from "../base/transfer-objects/BaseEntityDto";

@Sealed
export class ChainTransactionDto extends BaseEntityDto {

    @Expose()
    public sender: string;

    @Expose()
    public receiver: string;
}
