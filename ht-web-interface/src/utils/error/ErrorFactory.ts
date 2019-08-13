import * as _ from "lodash";

import { AxiosError } from "axios";

import { ObjectCheckOf } from "../foundation/class";
import { CompositeKey } from "../foundation/CompositeKey";

import { Status } from "../../models/status";

import { ErrorDefaultMessage } from "./ErrorMessage";
import { undefinedPayload } from "./UndefinedError";

export class ErrorFactory {

    public static buildError(error: Error | AxiosError): Status {
        if (!_.isNil(error)) {

            if (ObjectCheckOf<AxiosError>(error, "response")) {
                const errorKey = CompositeKey(
                    _.get(error, "response.data.error.data.key", "io.ht.Error.Undefined"),
                    _.get(error, "response.data.error.data.entity", "undefined"),
                );

                if (!_.isNil(ErrorDefaultMessage[errorKey])) {
                    const payload: Status = {
                        key: errorKey,
                        message: ErrorDefaultMessage[errorKey](),
                        status: error.response.status,
                    };
                    return payload;
                }

                return undefinedPayload;

            }

        }

        return null;
    }

}
