import { Action } from "../../utils/redux";
import { Account } from "./Account";
import { AccountEvent } from "./AccountEvent";
import { AccountState } from "./AccountState";
import { AccountStateMap } from "./AccountStateMap";

const InitialState: AccountState = { data: null, loading: false, editAccountSuccess: false };

export const AccountReducer = (state: AccountState = InitialState, action: Action<Account>) => {
    const map = {
        [ AccountEvent.Show ]:                    () => ({ ...state, loading: true }),
        [ AccountEvent.ShowSuccess ]:             () => ({ ...state, loading: false, error: null, data: action.payload }),
        [ AccountEvent.ShowFailure ]:             () => ({ ...state, loading: false, error: action.payload }),
        [ AccountEvent.Edit ]:                    () => ({ ...state, loading: true }),
        [ AccountEvent.EditSuccess ]:             () => ({ ...state, loading: false, error: null, editAccountSuccess: true }),
        [ AccountEvent.EditFailure ]:             () => ({ ...state, loading: false, error: action.payload, editAccountSuccess: false }),
        [ AccountEvent.EditAccountSuccessReset ]: () => ({ ...state, loading: false, editAccountSuccess: false }),
        [ AccountEvent.ResetAccountError ]:       () => ({ ...state, error: null }),
    } as AccountStateMap;
    return map[ action.type ] ? map[ action.type ]() : state;
};
