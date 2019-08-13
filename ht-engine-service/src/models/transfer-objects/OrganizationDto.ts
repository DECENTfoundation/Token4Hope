import { Exclude, Expose, Type } from "class-transformer";

import { Sealed } from "../../utils/foundation/class/decorators";
import { BaseEntityDto } from "../base/transfer-objects/BaseEntityDto";
import { ChainEntityDto } from "./ChainEntityDto";

@Sealed
export class OrganizationDto extends BaseEntityDto {

    @Expose()
    public get name(): string { return this.chainEntity.name; }

    @Exclude()
    @Type(() => ChainEntityDto)
    public chainEntity: ChainEntityDto;

    @Expose()
    public role: string;

}
