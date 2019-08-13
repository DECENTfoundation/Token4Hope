import { BelongsTo, Column, DefaultScope, ForeignKey, Table } from "sequelize-typescript";

import { BaseEntityModel } from "../base/entities/BaseEntityModel";
import { TransferObjectType } from "../base/transfer-objects/decorators";
import { ChainTransactionDto } from "../transfer-objects/ChainTransactionDto";
import { User } from "./User";

@DefaultScope({})
@Table({ modelName: "chain_transaction" })
@TransferObjectType(() => ChainTransactionDto)
export class ChainTransaction extends BaseEntityModel<ChainTransaction> {

    @Column
    public sender: string;

    @Column
    public receiver: string;

    @Column
    public amount: string;

    @Column
    public transactionId: string;

    @ForeignKey(() => User)
    @Column({ field: "user_id" })
    public userId: number;

    @BelongsTo(() => User)
    public user: User;
}
