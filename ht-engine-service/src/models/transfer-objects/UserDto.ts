import { Exclude, Expose, Type } from "class-transformer";

import { Sealed } from "../../utils/foundation/class/decorators";
import { BaseEntityDto } from "../base/transfer-objects/BaseEntityDto";
import { OrganizationDto } from "./OrganizationDto";

@Sealed
export class UserDto extends BaseEntityDto {

    @Expose()
    public get chainId(): string {
        return this.organization.chainEntity.chainId;
    }

    @Expose()
    public get chainName(): string {
        return this.organization.chainEntity.chainName;
    }

    @Expose()
    public get name(): string {
        return this.organization.chainEntity.name;
    }

    @Expose()
    public email: string;

    @Expose()
    public get roles(): string[] {
        return [this.organization.role];
    }

    @Exclude()
    public password: string;

    @Exclude()
    public organizationId: number;

    @Exclude()
    @Type(() => OrganizationDto)
    public organization: OrganizationDto;
}
