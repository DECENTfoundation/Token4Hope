import * as _ from "lodash";

import { Status } from "../../models/status";

import { ObjectKeyLiteral } from "../foundation/class";

import { ValidationRegex } from "./Regex";
import { ValidationEnum } from "./ValidationEnum";

export class Validator {

    public errorStack: Status[] = [];

    public readonly validationMap: ObjectKeyLiteral = {
        [ValidationEnum.Email]: (value: any) => ValidationRegex.email.test(value),
        [ValidationEnum.Password]: (value: any) => ValidationRegex.password.test(value),
        [ValidationEnum.YoutubeAsset]: (value: any) => _.isNil(value) || _.isEmpty(value) ? true : ValidationRegex.youtubeAsset.test(value),
        [ValidationEnum.BIC]: (value: any) => ValidationRegex.BIC.test(value),
        [ValidationEnum.Required]: (value: any) => !_.isNil(value) ? !_.isEmpty(value.toString()) : false,
    };

    public errors(data: any): Status[] | Status {

        _.each(data, (field) => {

            field.validate = !_.isArray(field.validate) ? [field.validate] : field.validate;

            this.validate(field);

        });

        const stack = this.errorStack;
        this.errorStack = [];

        return stack;
    }

    public validate(field: any) {

        const localErrorStack: ValidationEnum = _.find(field.validate, (validation) => {
            return this.validationMap[validation] ? !this.validationMap[validation](field.value) : false;
        });

        if (!_.isNil(localErrorStack)) {

            let key = `io.ht.validation.Error.${field.name}.Valid`;
            let message = `${field.label} is not valid`;

            if (_.isEqual(localErrorStack, ValidationEnum.Required)) {
                key = `io.ht.validation.Error.${field.name}.Required`;
                message = `${field.label} should not be empty`;
            }

            this.errorStack.push({
                key,
                message,
                status: 400,
            });

        }

    }

}
