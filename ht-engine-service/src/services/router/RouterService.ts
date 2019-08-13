import * as Hapi from "hapi";
import * as _ from "lodash";

import { inject, injectable } from "inversify";

import { plainToClass } from "class-transformer";

import { Controller } from "../../controllers/base/Controller";
import { AssemblyFactory } from "../../plugins/assembly";
import { RouterFactory } from "../../plugins/router";
import { JoiBuilderFactory } from "../../plugins/validation";
import { HttpMethod } from "../../utils/http";
import { Payload } from "../../utils/payload";

import { RouteHandlerFactory } from "./RouteHandlerFactory";
import { RouteMount } from "./RouteMount";
import { RouteParameterItem } from "./RouteParameterItem";
import { RouteParameterType } from "./RouteParameterType";
import { RouteValidation } from "./RouteValidation";
import { RouteValidationValues } from "./RouteValidationValues";

@injectable()
export class RouterService {

    @inject("Factory<Assembly>")
    private assemblyFactory: AssemblyFactory;

    @inject("Factory<Router>")
    private routerFactory: RouterFactory;

    @inject("JoiBuilder")
    private joi: JoiBuilderFactory;

    private mounts: Map<string, Controller> = new Map();

    public createRoutes(server: Hapi.Server, payload: Payload | any): Hapi.ServerRoute[] {
        return this.createMounts(payload).map((mount: RouteMount) => {

            const [handler, controller] = this.createRouteBinding(server, mount);
            const options = this.createRouteOptions(mount, controller);

            return ({ ...mount.exposed, options, handler });
        });
    }

    private createRouteBinding(server: Hapi.Server, mount: RouteMount): [Hapi.Lifecycle.Method, Controller] {
        let controller = null; let handler = null; const [operation, action] = mount.binding;
        if (this.mounts.has(operation)) {

            controller = this.mounts.get(operation);

            const linked = _.get(mount, "metadata.linked");
            if (!_.isNil(linked)) {
                controller.linked = { ...controller.linked, ...linked };
            }

            handler = controller.getHandler(action);
        } else {

            const container = this.assemblyFactory(server).getContainer();
            if (container.isBound(operation)) {

                controller = container.get<Controller>(operation);
                controller.linked = _.get(mount, "metadata.linked");

                handler = controller.getHandler(action);

                this.mounts.set(operation, controller);
            }
        }

        if (_.isNil(handler)) {
            handler = RouteHandlerFactory.buildUnrecognized(mount);
        }
        return [handler, controller];
    }

    private createRouteOptions(mount: RouteMount, controller: Controller): ((server: Hapi.Server) => Hapi.RouteOptions) {
        const self = this;
        return ((server: Hapi.Server): Hapi.RouteOptions => {
            const resultOptions: Hapi.RouteOptions = {
                auth: mount.scopes,
                bind: controller,
                cors: {
                    origin: ["*"],
                },
                description: mount.description,
                id: mount.operationId,
                isInternal: mount.enabledInternal,
                payload: self.createRoutePayloads(server, mount),
                tags: mount.tags,
            };
            const validationObject = self.buildValidations(mount);

            if (!_.isNil(validationObject)) {
                resultOptions.validate = validationObject;
            }
            return resultOptions;
        });
    }

    private buildValidations(mount: RouteMount): RouteValidation {
        if (_.isEmpty(mount.parameters)) {
            return null;
        }

        const params = this.transformToObject(mount.parameters, RouteParameterType.PATH);
        const query = this.transformToObject(mount.parameters, RouteParameterType.QUERY);
        const form = this.transformToObject(mount.parameters, RouteParameterType.FORM);
        const body = this.transformToObject(mount.parameters, RouteParameterType.BODY);

        const resultValidations: RouteValidation = {};

        if (!_.isNil(params)) {
            resultValidations.params = params;
        }
        if (!_.isNil(query)) {
            resultValidations.query = query;
        }
        if (!_.isNil(form) && (!mount.enabledMultipart || mount.metadata.payload.parse)) {
            resultValidations.payload = form;
        }
        if (!_.isNil(body)) {
            resultValidations.payload = body;
        }

        return resultValidations;
    }

    private transformToObject(parameters: RouteParameterItem[], type: string): RouteValidationValues {
        const params = _.filter(parameters, (param) => _.isEqual(param.in, type));
        if (_.isEmpty(params)) {
            return null;
        }
        if (_.isEqual(RouteParameterType.BODY, type)) {
            return this.joi.key(_.first(params));
        }
        const joiObject: RouteValidationValues = {};
        for (const param of params) {
            joiObject[param.name] = param;
        }
        return this.joi.object(joiObject);
    }

    private createRoutePayloads(server: Hapi.Server, mount: RouteMount): Hapi.RouteOptionsPayload {
        const agent = this.routerFactory(server).getAgent();
        return (!_.includes([HttpMethod.Get, HttpMethod.Head, HttpMethod.Delete], mount.method)) ? {
            allow: _.uniq(_.concat(agent.consumes, mount.consumes || [])),
            failAction: RouteHandlerFactory.buildFailure(),
            ...(mount.enabledMultipart ? {
                maxBytes: mount.metadata.payload.maxbytes,
                output: mount.metadata.payload.output,
                parse: mount.metadata.payload.parse,
            } : undefined),
        } : undefined;
    }

    private createMounts(payload: Payload | any): RouteMount[] {
        return plainToClass(RouteMount, _.flatMapDeep(
            _.transform(payload.paths, (configs: any[], methods: any, path: string) => {
                configs.push(_.transform(methods, (routes: any[], content: any, method: string) => {
                    routes.push({
                        consumes: payload.consumes,
                        parameters: payload.parameters,
                        produces: payload.produces,
                        ...content, method, path,
                    });
                }, []));
            }, [])),
        );
    }
}
