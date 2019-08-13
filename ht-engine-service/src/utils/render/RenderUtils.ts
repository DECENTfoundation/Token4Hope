import * as Boom from "boom";
import * as Hapi from "hapi";

import { Model } from "sequelize-typescript";

import { DataTransferObject, DataTransferTypeOfModel } from "../../models/base/types/BaseDataTransferObjectTypes";
import { OrmList } from "../../plugins/orm";
import { OrmUtils } from "../../plugins/orm/OrmUtils";
import { ObjectCheckOf } from "../foundation/class";
import { Metadata } from "../payload";
import { AnyListRenderer } from "./ListRenderer";
import { AnyRenderer } from "./Renderer";
import { RenderOptions } from "./RenderOptions";

export class RenderUtils {

    public static render<T extends Model<T>>(
        request: Hapi.Request,
        model: (Model<T> & DataTransferTypeOfModel) | DataTransferObject | Metadata,
        options?: RenderOptions,
    ): AnyRenderer {

        if (ObjectCheckOf<DataTransferTypeOfModel>(model, "toTransferObject")) {
            return {
                data: model.toTransferObject().toPayload(options),
            };
        }

        if (ObjectCheckOf<DataTransferObject>(model, "toPayload")) {
            return {
                data: model.toPayload(options),
            };
        }
        return {
            data: model,
        };
    }

    public static renderList<T extends Model<T>>(
        request: Hapi.Request,
        models: Array<(Model<T> & DataTransferTypeOfModel) | Metadata> | OrmList<T>,
        options?: RenderOptions,
    ): AnyListRenderer {
        if (ObjectCheckOf<OrmList<T>>(models, "rows")) {
            return {
                data: {
                    source: this.toTransferObject(models.rows, options),
                    ...OrmUtils.limitOffset(request),
                    count: models.count,
                },
            };
        }

        return {
            data: {
                source: this.toTransferObject(models, options),
                ...OrmUtils.limitOffset(request),
            },
        };
    }

    /**
     * Wrapping/Transforming boom error payload because of manual payload transformation
     * https://github.com/hapijs/boom#faq
     */

    public static renderError<Data = null>(
        boom: Boom<Data>,
        options?: RenderOptions,
        data?: Data,
    ): Boom<Data> {

        const payload = boom.output.payload; const status = payload.statusCode; const name = payload.error;

        delete payload.statusCode;
        delete payload.error;

        boom.output.payload = {
            error: { ...payload, status, name, data: boom.data || data },
        } as any;

        return boom;
    }

    private static toTransferObject<T>(models: T[], options?: RenderOptions) {
        return models.map(
            ($) => (ObjectCheckOf<DataTransferTypeOfModel>($, "toTransferObject") ? $.toTransferObject().toPayload(options) : $),
        );
    }
}
