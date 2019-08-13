import { ChainObject } from "dcorejs-sdk";
import { BelongsTo, Column, DefaultScope, Table } from "sequelize-typescript";
import { BlockChainAccount } from "../../plugins/blockchain";

import { BaseEntityModel } from "../base/entities/BaseEntityModel";
import { TransferObjectType } from "../base/transfer-objects/decorators";
import { ChainEntityDto } from "../transfer-objects/ChainEntityDto";
import { KeyPair } from "./KeyPair";

@DefaultScope({
    include: [
        () => KeyPair,
    ],
})
@Table({ modelName: "chain_entity" })
@TransferObjectType(() => ChainEntityDto)
export class ChainEntity extends BaseEntityModel<ChainEntity> implements BlockChainAccount {

    @Column({ allowNull: false })
    public name: string;

    @Column({})
    public chainId: string;

    @Column({ allowNull: false })
    public chainName: string;

    @BelongsTo(() => KeyPair, {
        constraints: false,
        foreignKey: "key_id",
    })
    public key: KeyPair;

    public async updateRepository(object: ChainObject): Promise<ChainEntity> {
        return this.update({ chainId: object.objectId});
    }

}
