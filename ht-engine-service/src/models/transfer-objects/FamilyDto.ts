import { Exclude, Expose, Type } from "class-transformer";

import { Sealed } from "../../utils/foundation/class/decorators";
import { BaseEntityDto } from "../base/transfer-objects/BaseEntityDto";
import { ChainEntityDto } from "./ChainEntityDto";

@Sealed
export class FamilyDto extends BaseEntityDto {

    @Expose()
    public cardNumber: string;

    @Expose()
    public chainId: string;

    @Expose()
    public chainName: string;

    @Expose()
    public chainNumber: string;

    @Exclude()
    @Type(() => ChainEntityDto)
    public chainEntity: ChainEntityDto;
}
