import * as Hapi from "hapi";
import * as HttpStatus from "http-status-codes";
import * as _ from "lodash";

import { Model } from "sequelize-typescript";

import { DataTransferObject, DataTransferTypeOfModel } from "../../models/base/types/BaseDataTransferObjectTypes";
import { OrmList } from "../../plugins/orm";
import { ObjectCheckOf } from "../foundation/class";
import { Metadata } from "../payload";
import { DtoContract } from "./DtoContract";
import { RenderOptions } from "./RenderOptions";

export class ResponseBuilder {

    private responseData: any;
    private headers: Map<string, string>;
    private statusCode: number = HttpStatus.OK;

    constructor(private response: Hapi.ResponseToolkit) { }

    public render<T extends Model<T>>(
        model: (Model<T> & DataTransferTypeOfModel) | DataTransferObject | Metadata,
        options?: RenderOptions,
    ): this {
        if (!_.isNil(this.responseData)) {
            throw new Error("You already rendered some data.");
        }

        this.responseData = model;

        if (ObjectCheckOf<DataTransferTypeOfModel>(model, DtoContract.ToTransferObject)) {
            this.responseData = model.toTransferObject().toPayload(options);
        }

        if (ObjectCheckOf<DataTransferObject>(model, DtoContract.ToPayload)) {
            this.responseData = model.toPayload(options);
        }

        return this;
    }

    public renderList<T extends Model<T>>(
        models: Array<(Model<T> & DataTransferTypeOfModel) | Metadata> | OrmList<T>,
        options?: RenderOptions,
    ): this {
        if (!_.isNil(this.responseData)) {
            throw new Error("You already rendered some data.");
        }

        if (ObjectCheckOf<OrmList<T>>(models, DtoContract.Rows)) {
            this.responseData = this.toTransferObject(models.rows, options);
        } else {
            this.responseData = this.toTransferObject(models, options);
        }

        return this;
    }

    public code(code: number): this {
        this.statusCode = code;
        return this;
    }

    public build(): any {
        const response = this.response.response(this.responseData);

        if (!_.isNil(this.headers)) {
            this.headers.forEach((value, key) => response.header(value, key));
        }

        return response.code(this.statusCode);
    }

    private toTransferObject<T>(models: T[], options?: RenderOptions): any {
        return models.map(
            ($) => (ObjectCheckOf<DataTransferTypeOfModel>($, DtoContract.ToTransferObject) ? $.toTransferObject().toPayload(options) : $),
        );
    }
}
