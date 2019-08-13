import * as Hapi from "hapi";

import { Assembly } from "../../../src/plugins/assembly";
import { SessionFactory } from "../../../src/plugins/session";
import { Plugin, PluginUtils } from "../../../src/utils/plugin";

export class SessionStoreFactory {

    public static flush(server: Hapi.Server): void {
        const container = PluginUtils.resolve<Assembly>(server, Plugin.Assembly).getContainer();
        container.get<SessionFactory>("Factory<Session>")(server).flush();
    }
}
