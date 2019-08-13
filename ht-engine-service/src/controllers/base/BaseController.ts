import * as Boom from "boom";
import * as Hapi from "hapi";
import * as HttpStatus from "http-status-codes";
import * as _ from "lodash";

import { inject, injectable, optional } from "inversify";
import { Model } from "sequelize-typescript";

import { ValidationError } from "sequelize";
import { AccessControl, AccessControlMap } from "../../models/access-control";
import { DataTransferTypeOfModel } from "../../models/base/types/BaseDataTransferObjectTypes";
import { AuthScopeFactory } from "../../plugins/auth";
import { OrmList, OrmModelProvider, OrmQuery, OrmQueryFactory, OrmQueryTarget } from "../../plugins/orm";
import { RouteOwner, RouterFactory } from "../../plugins/router";
import { RouteLink } from "../../plugins/router/RouteLink";
import { Agent } from "../../services/agent";
import { ObjectCheckOf } from "../../utils/foundation/class";
import { RestMethod } from "../../utils/http";
import { LoggerTag } from "../../utils/logger";
import { RenderUtils } from "../../utils/render";
import { Controller } from "./Controller";

@injectable()
export abstract class BaseController<T extends Model<T> & DataTransferTypeOfModel> implements Controller, OrmQueryTarget {

    public linked?: RouteLink;

    @inject("Factory<AuthScope>")
    protected auth: AuthScopeFactory;

    @inject("Factory<Router>")
    protected routerFactory: RouterFactory;

    @inject(RestMethod.Index)
    @optional()
    protected $indexFactory: OrmModelProvider;

    @inject(RestMethod.Show)
    @optional()
    protected $showFactory: OrmModelProvider;

    @inject(RestMethod.Edit)
    @optional()
    protected $editFactory: OrmModelProvider;

    @inject(RestMethod.Create)
    @optional()
    protected $createFactory: OrmModelProvider;

    @inject(RestMethod.Update)
    @optional()
    protected $updateFactory: OrmModelProvider;

    @inject(RestMethod.Delete)
    @optional()
    protected $deleteFactory: OrmModelProvider;

    @inject(RestMethod.Upload)
    @optional()
    protected $uploadFactory: OrmModelProvider;

    @inject("Factory<OrmModelProvider>>")
    private query: OrmQueryFactory;

    public get target(): string {
        return this.constructor.name;
    }

    public getHandler(name: string): Hapi.Lifecycle.Method {
        return _.get(this, name, null) as Hapi.Lifecycle.Method;
    }

    public async index(request: Hapi.Request, helper: Hapi.ResponseToolkit): Promise<Hapi.Lifecycle.ReturnValueTypes> {
        const agent = this.getAgent(request, RouteOwner.App);
        try {
            const result = await this.$indexFactory<OrmList<T>>(request, agent);
            const data = await this.beforeListRender(request, result) as OrmList<T>;

            return RenderUtils.renderList(request, data, { agent, groups: this.getAccessControl(RestMethod.Index) });

        } catch (error) {
            return this.renderError(request, error);
        }
    }

    public async show(request: Hapi.Request, helper: Hapi.ResponseToolkit): Promise<Hapi.Lifecycle.ReturnValueTypes> {
        const agent = this.getAgent(request, RouteOwner.App);
        try {
            const result = await this.$showFactory<T>(request, agent) as T;
            if (_.isNil(result)) {
                throw Boom.notFound();
            }

            const data = await this.beforeRender(request, result) as T;
            return RenderUtils.render(request, data, { agent, groups: this.getAccessControl(RestMethod.Show) });

        } catch (error) {
            return this.renderError(request, error);
        }
    }

    public async edit(request: Hapi.Request, helper: Hapi.ResponseToolkit): Promise<Hapi.Lifecycle.ReturnValueTypes> {
        const agent = this.getAgent(request, RouteOwner.App);
        try {
            await this.$editFactory<T>(request, agent);
            return helper
                .response()
                .code(HttpStatus.NO_CONTENT);
        } catch (error) {
            return this.renderError(request, error);
        }
    }

    public async update(request: Hapi.Request, helper: Hapi.ResponseToolkit): Promise<Hapi.Lifecycle.ReturnValueTypes> {
        const agent = this.getAgent(request, RouteOwner.App);
        try {
            await this.$updateFactory<T>(request, agent);
            return helper
                .response()
                .code(HttpStatus.NO_CONTENT);
        } catch (error) {
            return this.renderError(request, error);
        }
    }

    public async upload(request: Hapi.Request, helper: Hapi.ResponseToolkit): Promise<Hapi.Lifecycle.ReturnValueTypes> {
        const agent = this.getAgent(request, RouteOwner.App);
        try {
            await this.$uploadFactory<T>(request, agent);
            return helper
                .response()
                .code(HttpStatus.NO_CONTENT);
        } catch (error) {
            return this.renderError(request, error);
        }
    }

    public async create(request: Hapi.Request, helper: Hapi.ResponseToolkit): Promise<Hapi.Lifecycle.ReturnValueTypes> {
        const agent = this.getAgent(request, RouteOwner.App);
        try {
            const result = await this.$createFactory<T>(request, agent) as T;
            if (_.isNil(result)) {
                throw Boom.badData();
            }

            return RenderUtils.render(request, result, { agent, groups: this.getAccessControl(RestMethod.Create) });
        } catch (error) {
            return this.renderError(request, error);
        }
    }

    public async delete(request: Hapi.Request, helper: Hapi.ResponseToolkit): Promise<Hapi.Lifecycle.ReturnValueTypes> {
        const agent = this.getAgent(request, RouteOwner.App);
        try {
            await this.$deleteFactory<T>(request, agent);
            return helper
                .response()
                .code(HttpStatus.NO_CONTENT);
        } catch (error) {
            return this.renderError(request, error);
        }
    }

    protected renderError<Data = null>(request: Hapi.Request, error: any): Boom<Data> {
        const agent = this.getAgent(request, RouteOwner.App);
        const boom = Boom.boomify(error, ObjectCheckOf<ValidationError>(error, "errors") ? { statusCode: HttpStatus.BAD_REQUEST } : null);

        if (_.includes([
            HttpStatus.NOT_IMPLEMENTED,
            HttpStatus.SERVICE_UNAVAILABLE,
            HttpStatus.INTERNAL_SERVER_ERROR,
        ], boom.output.statusCode)) {
            request.server.log([LoggerTag.Error, LoggerTag.Router], boom);
        }

        return RenderUtils.renderError(boom, { agent });
    }

    protected async beforeRender(request: Hapi.Request, model: T): Promise<T> {
        return model;
    }

    protected async beforeListRender(request: Hapi.Request, model: OrmList<T>): Promise<OrmList<T>> {
        return model;
    }

    protected getQuery(query: OrmQuery): OrmModelProvider {
        return this.query(query, this);
    }

    protected getAccessControl(method: RestMethod): AccessControl[] {
        const access: AccessControlMap = {};
        return access[method] ? access[method] : [];
    }

    protected getAgent(request: Hapi.Request, owner?: RouteOwner): Agent {
        return this
            .routerFactory(request, owner)
            .getAgent();
    }
}
