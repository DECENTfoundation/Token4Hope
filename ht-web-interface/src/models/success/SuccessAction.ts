import { Action } from "../../utils/redux";

import { Success } from "./Success";
import { SuccessEvent } from "./SuccessEvent";

export class SuccessAction {
    public static resetSuccess = (): Action => {
        return { type: SuccessEvent.Reset };
    }

    public static createSuccess = (payload: Success): Action<Success> => {
        return { type: SuccessEvent.Create, payload };
    }
}
