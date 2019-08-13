
import * as Hapi from "hapi";

import { Sequelize } from "sequelize-typescript";
import { ChainEntity } from "../../models/entities/ChainEntity";
import { TransferOperation } from "../../models/entities/TransferOperation";

import { lazyInject } from "../assembly/decorators";

import { Setting } from "../../models/entities/Setting";
import { User } from "../../models/entities/User";

import { LoggerTag } from "../../utils/logger";
import { Plugin } from "../../utils/plugin";

import { ChainTransaction } from "../../models/entities/ChainTransaction";
import { Family } from "../../models/entities/Family";
import { KeyPair } from "../../models/entities/KeyPair";
import { OperationLog } from "../../models/entities/OperationLog";
import { Organization } from "../../models/entities/Organization";
import { OrmOptions } from "./OrmOptions";
import { OrmProvider } from "./OrmProvider";

export class OrmPlugin implements Hapi.PluginBase<OrmOptions>, Hapi.PluginNameVersion {

    public readonly name: string = Plugin.Orm;
    public readonly version: string = "1.0.0";
    public readonly dependencies: string[] = [Plugin.Assembly];

    @lazyInject("OrmProvider")
    private provider: OrmProvider;

    private connection: Sequelize;

    public async register(server: Hapi.Server, options: OrmOptions): Promise<void> {

        const connection = await this.provider(options);
        connection.addModels([
            KeyPair,
            Setting,
            ChainTransaction,
            OperationLog,
            Family,
            Organization,
            User,
            ChainEntity,
            TransferOperation,
        ]);

        if (options.syncSchema) {
            await connection.sync();
        }

        this.connection = connection;

        server.expose({ getConnection: (): Sequelize => this.connection });
        server.log([LoggerTag.Info, LoggerTag.Orm], "Orm plugin registered successfully.");
    }
}
