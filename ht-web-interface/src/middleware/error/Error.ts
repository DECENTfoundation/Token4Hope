import * as HttpStatus from "http-status-codes";
import * as _ from "lodash";

import { Dispatch, MiddlewareAPI } from "redux";

import { Action } from "../../utils/redux";

import { ContextState } from "../../models/context";

export const ErrorMiddleware = (store: MiddlewareAPI<Dispatch, ContextState>) => (next: Dispatch) => (action: Action) => {

    const failRegex = /(\w+)\/(\w+)_FAILURE/;

    if (failRegex.test(action.type)) {
        const status = action.payload.response.status;
        if (_.toNumber(status) === HttpStatus.UNAUTHORIZED) {
            window.location.href = "/";
        }
    }

    return next(action);
};
