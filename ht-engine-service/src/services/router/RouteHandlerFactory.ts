import * as Boom from "boom";
import * as Hapi from "hapi";

import { RenderUtils } from "../../utils/render";
import { RouteMount } from "./RouteMount";

export class RouteHandlerFactory {

    // FIXME: Compiler fails on Hapi lifecycle method with error, therefor as workaround we use also `any`.

    public static buildFailure(): Hapi.Lifecycle.Method | any {
        return (request: Hapi.Request, helper: Hapi.ResponseToolkit, error: Error) => {
            const boom = Boom.boomify(error);
            return RenderUtils.renderError(boom);
        };
    }

    public static buildUnrecognized(mount: RouteMount): Hapi.Lifecycle.Method | any {
        return (request: Hapi.Request, helper: Hapi.ResponseToolkit) => {
            return RenderUtils.renderError(Boom.notFound(
                `Unrecognized route mount for [${mount.operationId}].`,
            ));
        };
    }
}
