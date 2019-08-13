import { Exclude, Expose, Type } from "class-transformer";

import { Sealed } from "../../utils/foundation/class/decorators";
import { BaseEntityDto } from "../base/transfer-objects/BaseEntityDto";
import { KeyPair } from "../entities/KeyPair";

@Sealed
export class ChainEntityDto extends BaseEntityDto {

    @Expose()
    public name: string;

    @Expose()
    public chainId: string;

    @Expose()
    public chainName: string;

    @Exclude()
    @Type(() => KeyPair)
    public key: KeyPair;
}
