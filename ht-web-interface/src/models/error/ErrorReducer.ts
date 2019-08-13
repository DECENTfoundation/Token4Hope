import { Action } from "../../utils/redux";

import { Error } from "./Error";
import { ErrorEvent } from "./ErrorEvent";
import { ErrorState } from "./ErrorState";
import { ErrorStateMap } from "./ErrorStateMap";

const InitialState: ErrorState = {
    source: null,
};

export const ErrorReducer = (state: ErrorState = InitialState, action: Action<Error>) => {
    const map = {
        [ ErrorEvent.Reset ]:  () => InitialState,
        [ ErrorEvent.Create ]: () => ({ ...state, source: action.payload }),
    } as ErrorStateMap;

    return map[action.type] ? map[action.type]() : state;
};
