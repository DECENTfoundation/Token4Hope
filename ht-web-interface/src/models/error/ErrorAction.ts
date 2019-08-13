import { Action } from "../../utils/redux";

import { Error } from "./Error";
import { ErrorEvent } from "./ErrorEvent";

export class ErrorAction {
    public static resetError = (): Action => {
        return { type: ErrorEvent.Reset };
    }

    public static createError = (payload: Error): Action<Error> => {
        return { type: ErrorEvent.Create, payload };
    }
}
