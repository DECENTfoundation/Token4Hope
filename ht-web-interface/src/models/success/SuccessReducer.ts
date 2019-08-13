import { Action } from "../../utils/redux";

import { Success } from "./Success";
import { SuccessEvent } from "./SuccessEvent";
import { SuccessState } from "./SuccessState";
import { SuccessStateMap } from "./SuccessStateMap";

const InitialState: SuccessState = {
    source: null,
};

export const SuccessReducer = (state: SuccessState = InitialState, action: Action<Success>) => {
    const map = {
        [ SuccessEvent.Reset ]:  () => InitialState,
        [ SuccessEvent.Create ]: () => ({ ...state, source: action.payload }),
    } as SuccessStateMap;

    return map[action.type] ? map[action.type]() : state;
};
