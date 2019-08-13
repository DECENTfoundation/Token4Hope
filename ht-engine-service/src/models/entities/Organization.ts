import { BelongsTo, Column, DefaultScope, HasMany, Scopes, Table } from "sequelize-typescript";

import { BaseEntityModel } from "../base/entities/BaseEntityModel";
import { TransferObjectType } from "../base/transfer-objects/decorators";
import { BlockchainTypeOfModel } from "../base/types/BaseBlockchainTypes";
import { GenericScope } from "../scopes/GenericScope";
import { OrganizationDto } from "../transfer-objects/OrganizationDto";
import { ChainEntity } from "./ChainEntity";
import { User } from "./User";

@DefaultScope({
    include: [
        () => ChainEntity,
    ],
})
@Scopes({
    [GenericScope.DependencyAll]: {
        include: [{ all: true } as any],
    },
})
@Table({ modelName: "organizations" })
@TransferObjectType(() => OrganizationDto)
export class Organization extends BaseEntityModel<Organization> implements BlockchainTypeOfModel {

    @Column({ allowNull: false })
    public role: string;

    @BelongsTo(() => ChainEntity, {
        constraints: false,
        foreignKey: "chainId",
        targetKey: "chainId",
    })
    public chainEntity: ChainEntity;

    @HasMany(() => User)
    public users: User[];
}
