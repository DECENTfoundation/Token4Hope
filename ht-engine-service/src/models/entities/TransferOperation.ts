import { BelongsTo, Column, DataType, DefaultScope, Table } from "sequelize-typescript";

import { BaseEntityModel } from "../base/entities/BaseEntityModel";
import { TransferObjectType } from "../base/transfer-objects/decorators";
import { TransferOperationDto } from "../transfer-objects/TransferOperationDto";
import { ChainEntity } from "./ChainEntity";

@DefaultScope({
    include: [
        {
            as: "fromEntity",
            model: () => ChainEntity,
        },
        {
            as: "toEntity",
            model: () => ChainEntity,
        },
    ],
    order: [[ "id", "DESC" ]],
})
@Table({ modelName: "transfer_operations" })
@TransferObjectType(() => TransferOperationDto)
export class TransferOperation extends BaseEntityModel<TransferOperation> {

    @Column({ field: "from_address" })
    public fromAddress: string;

    @Column({ field: "to_address" })
    public toAddress: string;

    @Column
    public amount: string;

    @Column({ type: DataType.DATE, field: "block_timestamp" })
    public blockTimestamp: Date;

    @Column({ type: DataType.BIGINT})
    public block: string;

    @BelongsTo(() => ChainEntity, {
        constraints: false,
        foreignKey: "fromAddress",
        targetKey: "chainId",
    })
    public fromEntity: ChainEntity;

    @BelongsTo(() => ChainEntity, {
        constraints: false,
        foreignKey: "toAddress",
        targetKey: "chainId",
    })
    public toEntity: ChainEntity;
}
