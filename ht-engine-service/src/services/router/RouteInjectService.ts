import * as Hapi from "hapi";
import { injectable } from "inversify";
import * as _ from "lodash";

import { RouteInject, RouteLink } from "../../plugins/router";
import { HttpMethod } from "../../utils/http";
import { Payload } from "../../utils/payload";

@injectable()
export class RouteInjectService implements RouteInject {

    protected options: Hapi.ServerInjectOptions;
    protected source: Hapi.Server;
    protected linked: RouteLink;

    constructor(source: Hapi.Request, linked: RouteLink, options?: Hapi.ServerInjectOptions) {
        this.source = source.server;
        this.linked = linked;
        this.options = { allowInternals: true, headers: source.headers, ...options };
    }

    public async post(payload: Payload): Promise<Hapi.ServerInjectResponse> {
        const method = HttpMethod.Post;
        return this.source.inject(
            { ...this.options, method, url: this.linked[method].path, payload, ...this.buildHeaders(this.linked[method].id) },
        );
    }
    public async put(payload: Payload): Promise<Hapi.ServerInjectResponse> {
        const method = HttpMethod.Put;
        return this.source.inject(
            { ...this.options, method, url: this.linked[method].path, payload, ...this.buildHeaders(this.linked[method].id) },
        );
    }
    public async patch(payload: Payload): Promise<Hapi.ServerInjectResponse> {
        const method = HttpMethod.Patch;
        return this.source.inject(
            { ...this.options, method, url: this.linked[method].path, payload, ...this.buildHeaders(this.linked[method].id) },
        );
    }
    public async delete(payload: Payload): Promise<Hapi.ServerInjectResponse> {
        const method = HttpMethod.Delete;
        return this.source.inject(
            { ...this.options, method, url: this.linked[method].path, payload, ...this.buildHeaders(this.linked[method].id) },
        );
    }

    private buildHeaders(pathId: string) {
        const headerValue = _.first(this.source.lookup(pathId).settings.payload.allow);
        return {
            headers: {
                "Accept": headerValue,
                "Content-Type": headerValue,
            },
        };
    }
}
