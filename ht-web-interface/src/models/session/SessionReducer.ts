import { Action } from "../../utils/redux";

import { SessionState } from "./SessionState";
import { SessionStateMap } from "./SessionStateMap";

import { Session } from "./Session";
import { SessionEvent } from "./SessionEvent";

const InitialState: SessionState = { data: null, loading: false, error: null };

export const SessionReducer = (state: SessionState = InitialState, action: Action<Session>) => {
    const map = {
        [ SessionEvent.Current ]:        () => ({ ...state, loading: true }),
        [ SessionEvent.CurrentSuccess ]: () => ({ ...state, loading: false, data: action.payload, error: null }),
        [ SessionEvent.CurrentFailure ]: () => ({ ...state, loading: false, data: null, error: action.payload }),
        [ SessionEvent.Signin ]:         () => ({ ...state, loading: true }),
        [ SessionEvent.SigninSuccess ]:  () => ({ ...state, loading: false, data: action.payload, error: null }),
        [ SessionEvent.SigninFailure ]:  () => ({ ...state, loading: false, data: null, error: action.payload }),
        [ SessionEvent.Signout ]:        () => ({ ...state, loading: true }),
        [ SessionEvent.SignoutSuccess ]: () => ({ ...state, loading: false, data: null, error: null }),
        [ SessionEvent.SignoutFailure ]: () => ({ ...state, loading: false, data: null, error: action.payload }),
        [ SessionEvent.ResetSessionError ]: () => ({ ...state, error: null }),
    } as SessionStateMap;
    return map[action.type] ? map[action.type]() : state;
};
