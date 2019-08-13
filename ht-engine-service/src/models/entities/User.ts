import { BelongsTo, Column, DefaultScope, ForeignKey, HasMany, IsEmail, Scopes, Table } from "sequelize-typescript";

import { SessionPoolPolicy } from "../../plugins/session";
import { RouteScope } from "../../services/router/RouteScope";

import { BaseAuthModel } from "../base/entities/BaseAuthModel";
import { TransferObjectType } from "../base/transfer-objects/decorators";
import { GenericScope } from "../scopes/GenericScope";
import { UserDto } from "../transfer-objects/UserDto";
import { ChainTransaction } from "./ChainTransaction";
import { OperationLog } from "./OperationLog";
import { Organization } from "./Organization";

@DefaultScope({
    include: [
        () => Organization,
    ],
})
@Scopes({
    [GenericScope.DependencyAll]: {
        include: [{ all: true } as any],
    },
})
@Table({ modelName: "users" })
@TransferObjectType(() => UserDto)
export class User extends BaseAuthModel<User> {

    public cretentialsPool: SessionPoolPolicy = SessionPoolPolicy.Organization;
    public pool: SessionPoolPolicy = SessionPoolPolicy.User;

    @IsEmail
    @Column({ allowNull: false })
    public email: string;

    @HasMany(() => ChainTransaction)
    public chainTransactions: ChainTransaction[];

    @HasMany(() => OperationLog)
    public operations: OperationLog[];

    @ForeignKey(() => Organization)
    @Column({ field: "organization_id" })
    public organizationId: number;

    @BelongsTo(() => Organization)
    public organization: Organization;

    public get acl(): string | string[] {
        return [
            ...(super.acl),
            ...([this.organization] || []).map((r) => r.role),
            RouteScope.SelfUser,
        ];
    }
}
