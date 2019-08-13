import { Action } from "../../utils/redux";
import { Family } from "./Family";
import { FamilyEvent } from "./FamilyEvent";
import { FamilyState } from "./FamilyState";
import { FamilyStateMap } from "./FamilyStateMap";

const InitialState: FamilyState = { data: null, loading: false };

export const FamilyReducer = (state: FamilyState = InitialState, action: Action<Family>) => {
    const map = {
        [ FamilyEvent.Reset ]:         () => InitialState,
        [ FamilyEvent.Create ]:        () => ({ ...state, loading: true }),
        [ FamilyEvent.CreateSuccess ]: () => ({ ...state, loading: false, actionCompleted: true, error: null, data: action.payload }),
        [ FamilyEvent.CreateFailure ]: () => ({ ...state, loading: false, error: action.payload }),
        [ FamilyEvent.Edit ]:          () => ({ ...state, loading: true }),
        [ FamilyEvent.EditSuccess ]:   () => ({ ...state, loading: false, actionCompleted: true, error: null, data: action.payload }),
        [ FamilyEvent.EditFailure ]:   () => ({ ...state, loading: false, error: action.payload }),
    } as FamilyStateMap;
    return map[ action.type ] ? map[ action.type ]() : state;
};
