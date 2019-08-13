import { BelongsTo, DefaultScope, Scopes, Table } from "sequelize-typescript";

import { SessionPoolPolicy } from "../../plugins/session";
import { BaseAuthModel } from "../base/entities/BaseAuthModel";
import { TransferObjectType } from "../base/transfer-objects/decorators";
import { BlockchainTypeOfModel } from "../base/types/BaseBlockchainTypes";
import { GenericScope } from "../scopes/GenericScope";
import { FamilyDto } from "../transfer-objects/FamilyDto";
import { ChainEntity } from "./ChainEntity";

@DefaultScope({
    include: [() => ChainEntity],
})
@Scopes({
    [GenericScope.DependencyAll]: {
        include: [{ all: true } as any],
    },
})
@Table({ modelName: "families" })
@TransferObjectType(() => FamilyDto)
export class Family extends BaseAuthModel<Family> implements BlockchainTypeOfModel {

    public cretentialsPool: SessionPoolPolicy = SessionPoolPolicy.Organization;
    public pool: SessionPoolPolicy = SessionPoolPolicy.User;

    @BelongsTo(() => ChainEntity, {
        constraints: false,
        foreignKey: "chainId",
    })
    public chainEntity: ChainEntity;

    public authorizeCredentials(): Promise<void> {
        throw new Error("Method not implemented.");
    }

}
