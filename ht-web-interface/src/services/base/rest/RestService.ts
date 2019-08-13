/*
 * @Author: Michal Grman (mike@decent.ch)
 * @Date: 2018-03-11 20:34:58
 * @Last Modified by: Michal Grman (mike@decent.ch)
 * @Last Modified time: 2018-03-12 16:58:34
 */

import * as HttpStatus from "http-status-codes";
import * as _ from "lodash";

import { inject, injectable } from "inversify";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";

import { MultipartPayload, Params, ParamsFactory, PayloadTransformer } from "../../../utils/data";
import { ObjectCheckOf, ObjectKeyLiteral } from "../../../utils/foundation/class";

import { HttpHeader } from "../http/HttpHeader";
import { HttpRequest } from "../http/HttpRequest";
import { HttpService } from "../http/HttpService";

import { RestAuth } from "./RestAuth";
import { RestConfig } from "./RestConfig";
import { RestConfigMap } from "./RestConfigMap";
import { RestGateway } from "./RestGateway";
import { RestMethod } from "./RestMethod";
import { RestResource } from "./RestResource";
import { RestRoute } from "./RestRoute";

@injectable()
export abstract class RestService<T extends MultipartPayload = MultipartPayload> extends HttpService {

    @inject("Factory<ParamsTransformer>")
    protected paramsFactory: ParamsFactory;

    protected routes: RestConfigMap;
    protected authorized: RestAuth;
    protected transformer: PayloadTransformer;
    protected gateway: RestGateway;

    public signin(resource: RestResource<T>, payload: T, params?: Params): Observable<T>;
    public signin(path: any, payload: T, params?: Params): Observable<T> {
        return this.$post<T>(
            this.createRoute(RestMethod.Signin, path),
            this.createPayload(payload),
            this.createRequest(RestMethod.Signin, params),
        ).pipe(
            map(
                (value) => (value as T),
            ),
            tap(
                (data) => this.setCredentials(data),
                (error) => this.clearCredentials(HttpStatus.UNAUTHORIZED),
            ),
        );
    }

    public signout(resource: RestResource<T>, payload: T, params?: Params): Observable<T>;
    public signout(path: any, payload: T, params?: Params): Observable<T> {
        return this.$delete<T>(
            this.createRoute(RestMethod.Signout, path),
            this.createPayload(payload),
            this.createRequest(RestMethod.Signout, params),
        ).pipe(
            map(
                (value) => (value.data as T),
            ),
            tap(
                (data) => this.clearCredentials(HttpStatus.UNAUTHORIZED),
                (error) => this.clearCredentials(error.code),
            ),
        );
    }

    public signup(resource: RestResource<T>, payload: T, params?: Params): Observable<T>;
    public signup(path: any, payload: T, params?: Params): Observable<T> {
        return this.$post<T>(
            this.createRoute(RestMethod.Signup, path),
            this.createPayload(payload),
            this.createRequest(RestMethod.Signup, params),
        ).pipe(
            map(
                (value) => (value as T),
            ),
            tap(
                null,
                (error) => this.clearCredentials(HttpStatus.UNAUTHORIZED),
            ),
        );
    }

    public confirm(resource: RestResource<T>, payload?: T, params?: Params): Observable<T>;
    public confirm(path: any, payload?: T, params?: Params): Observable<T> {
        return this.$put<T>(
            this.createRoute(RestMethod.Confirm, path),
            this.createPayload(payload || {} as T), // Use empty in case not body to force 415.
            this.createRequest(RestMethod.Confirm, params),
        ).pipe(
            map(
                (value) => (value.data as T),
            ),
            tap(
                null,
                (error) => this.clearCredentials(HttpStatus.UNAUTHORIZED),
            ),
        );
    }

    public confirmChange(resource: RestResource<T>, payload: T, params?: Params): Observable<T>;
    public confirmChange(path: any, payload: T, params?: Params): Observable<T> {
        return this.$patch<T>(
            this.createRoute(RestMethod.ConfirmChange, path),
            this.createPayload(payload),
            this.createRequest(RestMethod.ConfirmChange, params),
        ).pipe(
            map(
                (value) => (value.data as T),
            ),
            tap(
                null,
                (error) => this.clearCredentials(HttpStatus.UNAUTHORIZED),
            ),
        );
    }

    public index(resource: RestResource<T>, params?: Params): Observable<T>;
    public index(path: any, params?: Params): Observable<T> {
        return this.$get<T>(
            this.createRoute(RestMethod.Index, path),
            this.createRequest(RestMethod.Index, params),
        ).pipe(
            map(
                (value) => ((value || { source: [] }) as T),
            ),
            tap(
                null,
                (error) => this.clearCredentials(error.code),
            ),
        );
    }

    public show(resource: RestResource<T>, params?: Params): Observable<T>;
    public show(path: any, params?: Params): Observable<T> {
        return this.$get<T>(
            this.createRoute(RestMethod.Show, path),
            this.createRequest(RestMethod.Show, params),
        ).pipe(
            map(
                (value) => (value as T),
            ),
            tap(
                null,
                (error) => this.clearCredentials(error.code),
            ),
        );
    }

    public edit(resource: RestResource<T>, payload: T, params?: Params): Observable<T>;
    public edit(path: any, payload: T, params?: Params): Observable<T> {
        return this.$patch<T>(
            this.createRoute(RestMethod.Edit, path),
            this.createPayload(payload),
            this.createRequest(RestMethod.Edit, params),
        ).pipe(
            map(
                (value) => (value.data as T),
            ),
            tap(
                null,
                (error) => this.clearCredentials(error.code),
            ),
        );
    }

    public update(resource: RestResource<T>, payload?: T, params?: Params): Observable<T>;
    public update(path: any, payload?: T, params?: Params): Observable<T> {
        return this.$put<T>(
            this.createRoute(RestMethod.Update, path),
            this.createPayload(payload || {} as T),
            this.createRequest(RestMethod.Update, params),
        ).pipe(
            map(
                (value) => (value.data as T),
            ),
            tap(
                null,
                (error) => this.clearCredentials(error.code),
            ),
        );
    }

    public create(resource: RestResource<T>, payload: T, params?: Params): Observable<T>;
    public create(path: any, payload: T, params?: Params): Observable<T> {
        return this.$post<T>(
            this.createRoute(RestMethod.Create, path),
            this.createPayload(payload),
            this.createRequest(RestMethod.Create, params),
        ).pipe(
            map(
                (value) => (value as T),
            ),
            tap(
                null,
                (error) => this.clearCredentials(error.code),
            ),
        );
    }

    public delete(resource: RestResource<T>, payload?: T, params?: Params): Observable<T>;
    public delete(path: any, payload?: T, params?: Params): Observable<T> {
        return this.$delete<T>(
            this.createRoute(RestMethod.Delete, path),
            this.createPayload(payload),
            this.createRequest(RestMethod.Delete, params),
        ).pipe(
            map(
                (value) => (value.data as T),
            ),
            tap(
                null,
                (error) => this.clearCredentials(error.code),
            ),
        );
    }

    public upload(resource: RestResource<T>, payload: T, params?: Params): Observable<T>;
    public upload(path: any, payload: T, params?: Params): Observable<T> {
        return this.$post<T>(
            this.createRoute(RestMethod.Upload, path),
            this.createPayload(payload),
            this.createRequest(RestMethod.Upload, params),
        ).pipe(
            map(
                (value) => (value as T),
            ),
            tap(
                null,
                (error) => this.clearCredentials(error.code),
            ),
        );
    }

    protected createRoute(method: RestMethod, resource: RestResource<T>): string {
        switch (true) {
            case _.isString(resource): return _.toString(resource);
            default: {
                const route = this.routes[method];
                const path = _.isString(route) ? route : route.path;
                return new RestRoute<T>(path, resource).toString();
            }
        }
    }

    protected createRequest(method: RestMethod, params?: Params): HttpRequest {
        const route = this.routes[method]; let auth = this.authorized; let headers;

        if (!_.isString(route) && ObjectCheckOf<RestConfig>(route, "path")) {
            auth = route.authorized || this.authorized;
        }

        if (!_.isString(route) && ObjectCheckOf<RestConfig>(route, "path")) {
            headers = route.headers;
        }

        return {
            headers: { ...headers, ...this.getCredentials(auth) },
            ...this.paramsFactory(params),
        };
    }

    protected createPayload(payload?: T): T {
        if (!_.isNil(payload) && !_.isUndefined((payload as any).append)) {
            return payload; // FormData
        }
        return this.transformer.toRemote(payload);
    }

    protected getCredentials(type: RestAuth): { [key: string]: string } {
        const token = this.storage.getItem(HttpHeader.Authorization);
        return (type !== RestAuth.None && !_.isNil(token)) ? {
            [HttpHeader.Authorization]: `${type} ${token}`,
        } : undefined;
    }

    protected setCredentials(data: T, key: string = "token") {
        this.storage.setItem(HttpHeader.Authorization, (data as ObjectKeyLiteral)[key]);
    }

    protected clearCredentials(status?: string | number) {
        if (!_.isUndefined(status) && _.toNumber(status) === HttpStatus.UNAUTHORIZED) {
            this.storage.removeItem(HttpHeader.Authorization);
        }
    }
}
