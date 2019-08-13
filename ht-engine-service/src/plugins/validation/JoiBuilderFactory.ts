import * as Joi from "joi";
import * as _ from "lodash";

import { RouteParameterItem } from "../../services/router/RouteParameterItem";
import { RouteValidationType } from "../../services/router/RouteValidationType";
import { RouteValidationValues } from "../../services/router/RouteValidationValues";

export class JoiBuilderFactory {
    public object(item: RouteValidationValues): Joi.ObjectSchema {
        const joiObject: RouteValidationValues = {};
        const properties = item.properties || item.items || item;
        const requiredFields = _.isArray(item.required) ? item.required : [];
        for (const key of Object.keys(properties)) {
            joiObject[key] = this.key({
                ...properties[key],
                required: _.includes(requiredFields, key),
            });
        }
        return Joi.object(joiObject);
    }

    public array(item: RouteParameterItem): Joi.ArraySchema {
        return Joi.array().items(this.key(item.items));
    }

    public string(item: RouteParameterItem): Joi.StringSchema {
        let stringValidation = Joi.string();
        if (_.isEqual(item.allowEmptyValue, true)) {
            stringValidation = stringValidation.allow("");
        }
        if (_.isEqual(item.format, RouteValidationType.Email)) {
            return stringValidation.email();
        }
        return stringValidation;
    }

    public integer(): Joi.NumberSchema {
        return Joi.number().integer();
    }

    public classify(item: RouteParameterItem): Joi.AnySchema {
        switch (item.type) {
            case RouteValidationType.String:
                return this.string(item);
            case RouteValidationType.Integer:
                return this.integer();
            case (RouteValidationType.Object):
                return this.object(item);
            case (RouteValidationType.Array):
                return this.array(item);
            case (RouteValidationType.Email):
            case (RouteValidationType.File):
                return Joi.any();
            case undefined:
                throw new Error("Missing type of field");
            default:
                throw new Error(`Type '${item.type}' not supported`);
        }
    }

    public key(item: RouteParameterItem): Joi.AnySchema {
        item = item.schema || item;
        const resultValidation = this.classify(item);
        return item.required ? resultValidation.required() : resultValidation;
    }
}
