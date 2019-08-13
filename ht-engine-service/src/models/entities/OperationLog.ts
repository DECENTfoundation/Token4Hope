import { BelongsTo, Column, DefaultScope, ForeignKey, Table } from "sequelize-typescript";

import { Operation } from "../../services/bussiness/common/Operation";
import { BaseEntityModel } from "../base/entities/BaseEntityModel";
import { TransferObjectType } from "../base/transfer-objects/decorators";
import { OperationLogDto } from "../transfer-objects/OperationLogDto";
import { User } from "./User";

@DefaultScope({})
@Table({ modelName: "operation_log" })
@TransferObjectType(() => OperationLogDto)
export class OperationLog extends BaseEntityModel<OperationLog> implements Operation {

    @Column
    public objectId: string;

    @Column
    public objectName: string;

    @Column
    public operation: string;

    @ForeignKey(() => User)
    @Column({ field: "user_id" })
    public userId: number;

    @BelongsTo(() => User)
    public user: User;
}
