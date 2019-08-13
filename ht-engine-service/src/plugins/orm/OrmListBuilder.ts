
import * as Hapi from "hapi";
import * as _ from "lodash";
import { ScopeOptions, WhereOptions } from "sequelize";
import { Model } from "sequelize-typescript";

import { NonAbstractTypeOfModel } from "../../models/base/types/BaseModelTypes";
import { GenericScope } from "../../models/scopes/GenericScope";
import { OrmList } from "./OrmList";
import { OrmUtils } from "./OrmUtils";

export class OrmListBuilder<T extends Model<T>> {

    private countScopes: Array<string | ScopeOptions | WhereOptions<any>> = [];
    private selectScopes: Array<string | ScopeOptions | WhereOptions<any>> = [];
    private whereStatement: any = null;
    private limitStatement: any = null;

    public constructor(private model: NonAbstractTypeOfModel<T>) { }

    public scope(scopes: Array<string | ScopeOptions | WhereOptions<any>>): this {
        const forbiddenCountScopes = Object.keys(GenericScope).map(($) => GenericScope[$ as any]);
        this.countScopes = _.merge(this.countScopes, scopes.filter(($) => _.isString($) && !_.includes(forbiddenCountScopes, $)));
        this.selectScopes = _.merge(this.selectScopes, scopes);

        return this;
    }

    public where(whereStatement: any): this {
        this.whereStatement = whereStatement;
        return this;
    }

    public limit(source: Hapi.Request): this {
        this.limitStatement = OrmUtils.limitOffset(source);
        return this;
    }

    public async build(): Promise<OrmList<T>> {
        return {
            count: await this.count(),
            rows: await this.rows(),
        };
    }

    private async count(): Promise<number> {
        const scopes = _.isEmpty(this.countScopes) ? [GenericScope.Default] : this.countScopes;
        return await this.model.scope(...scopes).count({ where: { ...this.whereStatement } });
    }

    private async rows(): Promise<T[]> {
        const scopes = _.isEmpty(this.selectScopes) ? [GenericScope.Default] : this.selectScopes;
        return await this.model.scope(...scopes).findAll({ where: { ...this.whereStatement }, ...this.limitStatement });
    }
}
