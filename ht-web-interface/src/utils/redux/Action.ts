import * as _ from "lodash";

import { PartialError } from "../error";

export interface Action<Data = null, E extends PartialError = PartialError> {
    type: string;
    payload?: Data | E | null | any;
}

export const Extract = <Data>(action: Action<Data>): Data => _.get(action, "payload", { params: undefined }) as Data;
