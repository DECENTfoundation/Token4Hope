import * as Boom from "boom";
import * as Hapi from "hapi";
import * as _ from "lodash";

import { inject, injectable } from "inversify";

import { RouterFactory } from "../../plugins/router";

import { ObjectExpose } from "../../utils/foundation/class";
import { HttpMethod } from "../../utils/http";
import { RenderUtils } from "../../utils/render";

import { Agent } from "./Agent";
import { AgentFactory } from "./AgentFactory";

@injectable()
export class AgentService implements Hapi.ServerExtEventsRequestObject, ObjectExpose<Hapi.ServerExtEventsRequestObject> {

    public type: Hapi.ServerRequestExtType = "onRequest";
    public method: Hapi.Lifecycle.Method = this.handler;
    public options: Hapi.ServerExtOptions = { after: [], before: [], bind: this };

    @inject("Factory<Router>")
    private routerFactory: RouterFactory;

    @inject("Factory<Agent>")
    private agentFactory: AgentFactory;

    public get exposed(): Hapi.ServerExtEventsRequestObject {
        return _.pick(this, ["type", "method", "options"]);
    }

    private async handler(request: Hapi.Request, helper: Hapi.ResponseToolkit): Promise<Hapi.Lifecycle.ReturnValueTypes> {

        const routerAgent = this.routerFactory(request).getAgent();
        const requestAgent = this.agentFactory(request);

        // TODO: extend error not acceptable via data to give user more precise error.
        if (request.method !== HttpMethod.Options && !requestAgent.isSupported(routerAgent)) {
            return RenderUtils.renderError(
                Boom.notAcceptable(`Supported types: [${routerAgent.produces}].`),
            );
        }

        request.app = { ...request.app, getAgent: (): Agent => requestAgent };
        return helper.continue;
    }
}
