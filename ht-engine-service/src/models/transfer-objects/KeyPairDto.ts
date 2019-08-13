import { Expose } from "class-transformer";

import { Sealed } from "../../utils/foundation/class/decorators";
import { AttributeAccess } from "../access-control";
import { BaseEntityDto } from "../base/transfer-objects/BaseEntityDto";

@Sealed
export class KeyPairDto extends BaseEntityDto {

    @Expose()
    public publicKey: string;

    @Expose({
        groups: [
            AttributeAccess.Session,
        ],
    })
    public privateKey: string;

    @Expose({
        groups: [
            AttributeAccess.Session,
        ],
    })
    public brainKey: string;

}
