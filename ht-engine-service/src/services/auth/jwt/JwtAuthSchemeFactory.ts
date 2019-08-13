import * as Boom from "boom";
import * as Hapi from "hapi";

import { Assembly } from "../../../plugins/assembly";
import { RouteOwner, RouterFactory } from "../../../plugins/router";

import { Plugin, PluginUtils } from "../../../utils/plugin";
import { RenderUtils } from "../../../utils/render";

import { JwtAuthOptions } from "./JwtAuthOptions";

export class JwtAuthSchemeFactory {

    public static buildScheme(): Hapi.ServerAuthScheme {
        return (server: Hapi.Server, options?: JwtAuthOptions): Hapi.ServerAuthSchemeObject => {

            const container = PluginUtils.resolve<Assembly>(server, Plugin.Assembly).getContainer();
            const routerFactory = container.get<RouterFactory>("Factory<Router>");

            return {
                authenticate: async (request: Hapi.Request, helper: Hapi.ResponseToolkit): Promise<Hapi.Lifecycle.ReturnValueTypes> => {
                    const authorization = routerFactory(request, RouteOwner.App).getAgent().authorization;
                    // JWT pattern `.` with size 3
                    if (!authorization.isValid({ pattern: ".", size: 3 })) {
                        throw RenderUtils.renderError(Boom.unauthorized());
                    }
                    try {
                        const strategy = options.strategy.exposed;
                        const result = await strategy.authenticate(request, authorization.token, helper);
                        return helper.authenticated(result);
                    } catch (error) {
                        throw RenderUtils.renderError(Boom.unauthorized());
                    }
                },
            };
        };
    }
}
