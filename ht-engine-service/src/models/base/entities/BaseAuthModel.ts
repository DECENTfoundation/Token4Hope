import * as Boom from "boom";
import * as _ from "lodash";

import { Column, Scopes } from "sequelize-typescript";

import { AuthIdentityPolicy } from "../../../plugins/auth";
import { SessionPoolPolicy } from "../../../plugins/session";
import { CryptoUtils } from "../../../utils/foundation";
import { Payload } from "../../../utils/payload";
import { AccountKeyError } from "../../constants/AccountKeyError";
import { ErrorEvent } from "../../events/ErrorEvent";
import { GenericScope } from "../../scopes/GenericScope";

import { AuthPasswordTypeOfModel } from "../types/BaseAuthModelTypes";
import { NonAbstractTypeOfModel } from "../types/BaseModelTypes";
import { BaseEntityModel } from "./BaseEntityModel";
import { BaseScope } from "./BaseScope";

@Scopes({
    [BaseScope.Identity]: (identity: AuthIdentityPolicy, value: string) => {
        if (_.isEqual(identity, AuthIdentityPolicy.CardNumber)) {
            return { where: { ["$chainEntity.name$" as any]: value }};
        }
        return { where: { [identity]: value } };
    },
})
export abstract class BaseAuthModel<T extends BaseEntityModel<T>> extends BaseEntityModel<T> {

    public static async authenticate<T extends AuthPasswordTypeOfModel<T>>(
        this: NonAbstractTypeOfModel<T>,
        identity: AuthIdentityPolicy,
        payload: Payload,
    ): Promise<T> {
        const result = await this.scope<T>(GenericScope.DependencyAll, {
            method: [BaseScope.Identity, identity, payload[identity]],
        }).findOne<T>();

        if (result && (await result.comparePassword(payload.password))) {
            return result;
        }

        throw Boom.badData<ErrorEvent<AccountKeyError>>(
            null, { key: AccountKeyError.InvalidCredentials, entity: this.name },
        );
    }

    public abstract cretentialsPool: SessionPoolPolicy = SessionPoolPolicy.Unknown;
    public abstract pool: SessionPoolPolicy = SessionPoolPolicy.Unknown;

    @Column({ allowNull: false })
    public get password(): string {
        return this.getDataValue("password");
    }
    public set password(password: string) {
        this.setDataValue("password", CryptoUtils.hashImmediate(password, 10));
    }

    public get acl(): string | string[] {
        return [`${(this as any)._modelOptions.name.singular}-${this.id}`];
    }

    public async comparePassword(password: string): Promise<boolean> {
        return await CryptoUtils.compareHash(password, this.password);
    }

    public comparePasswordImmediate(password: string): boolean {
        return CryptoUtils.compareHashImmediate(password, this.password);
    }
}
