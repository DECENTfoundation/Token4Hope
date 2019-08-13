import * as Hapi from "hapi";
import * as _ from "lodash";

import { Expose, Type } from "class-transformer";

import { ObjectExpose } from "../../utils/foundation/class";
import { RouteMetadataMount } from "./RouteMetadataMount";
import { RouteParameterItem } from "./RouteParameterItem";
import { RouteScope } from "./RouteScope";

export class RouteMount implements Hapi.ServerRoute, ObjectExpose<Hapi.ServerRoute> {

    public path: string;
    public method: string;
    public description: string;
    public operationId: string;
    public consumes: string[];
    public produces: string[];
    public security: any[];
    public parameters: RouteParameterItem[];
    public tags: string[];

    @Expose({ name: "x-ht-gateway-integration" })
    @Type(() => RouteMetadataMount)
    public metadata: RouteMetadataMount | null;

    public get enabledInternal(): boolean {
        return !_.isNil(this.metadata) && this.metadata.internal;
    }

    public get enabledSecurity(): boolean {
        return !_.isEmpty(this.security);
    }

    public get enabledValidation(): boolean {
        return !_.isNil(this.metadata) && !_.isNil(this.metadata.validation);
    }

    public get enabledMultipart(): boolean {
        return !_.isNil(this.metadata) && !_.isNil(this.metadata.payload);
    }

    public get exposed(): Hapi.ServerRoute {
        return _.pick(this, ["path", "method"]);
    }

    public get binding(): [string, string] {
        const operation = _.split(this.operationId, ":", 2);
        return [_.first(operation), _.last(operation)];
    }

    public get scopes(): Hapi.RouteOptionsAccess | false {
        return this.enabledSecurity ? {
            scope: _.flatten(this.metadata.security.scopes.map((s) => {
                switch (s) {
                    case RouteScope.Admin: return RouteScope.Admin;
                    case RouteScope.Charity: return RouteScope.Charity;
                    case RouteScope.Store: return RouteScope.Store;
                    case RouteScope.SelfUser: return [
                        `${RouteScope.SelfUser}`,
                        `${RouteScope.User}-{params.${RouteScope.User}Id}`,
                    ];
                    default: return `${s}-{params.${s}Id}`;
                }
            })),
        } : false;
    }
}
