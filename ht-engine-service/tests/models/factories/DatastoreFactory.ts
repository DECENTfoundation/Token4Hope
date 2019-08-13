import * as Hapi from "hapi";
import { Sequelize } from "sequelize-typescript";

import { Assembly } from "../../../src/plugins/assembly";
import { OrmFactory } from "../../../src/plugins/orm";
import { Plugin, PluginUtils } from "../../../src/utils/plugin";

export class DatastoreFactory {

    public static async sync(server: Hapi.Server): Promise<void> {
        const connection = this.getConnection(server);
        await connection.sync({ force: true });
    }

    public static async drop(server: Hapi.Server): Promise<void> {
        const connection = this.getConnection(server);
        await connection.drop({ cascade: true });
    }

    public static getConnection(server: Hapi.Server): Sequelize {
        const container = PluginUtils.resolve<Assembly>(server, Plugin.Assembly).getContainer();
        return container.get<OrmFactory>("Factory<Orm>")(server).getConnection();
    }
}
