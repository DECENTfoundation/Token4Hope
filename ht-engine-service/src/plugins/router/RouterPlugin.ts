
import * as Hapi from "hapi";
import * as OpenApi from "swagger-parser";
import { Spec } from "swagger-schema-official";

import { lazyInject } from "../assembly/decorators";

import { Agent, AgentFactory, AgentService } from "../../services/agent";
import { RouterService } from "../../services/router";

import { ConfigUtils } from "../../utils/configuration";
import { LoggerTag } from "../../utils/logger";
import { Plugin } from "../../utils/plugin";

import { RouterOptions } from "./RouterOptions";

export class RouterPlugin implements Hapi.PluginBase<RouterOptions>, Hapi.PluginNameVersion {

    public readonly name: string = Plugin.Routing;
    public readonly version: string = "1.0.0";
    public readonly dependencies: string[] = [Plugin.Assembly, Plugin.Auth];

    @lazyInject(AgentService)
    private agentService: AgentService;

    @lazyInject("Factory<Agent>")
    private agentFactory: AgentFactory;

    @lazyInject(RouterService)
    private routerService: RouterService;

    private agent: Agent;

    public async register(server: Hapi.Server, options: RouterOptions): Promise<void> {

        const spec = ConfigUtils.resolve<Spec>(`api/${options.name}.${options.version}`, { ext: "json" });

        await OpenApi.validate(spec);
        this.agent = this.agentFactory(spec);

        const routes = this.routerService.createRoutes(server, spec);

        server.expose({ getAgent: (): Agent => this.agent });
        server.ext([this.agentService.exposed]);
        server.route(routes);
        server.log([LoggerTag.Info, LoggerTag.Router], "Route plugin registered successfully.");
    }
}
