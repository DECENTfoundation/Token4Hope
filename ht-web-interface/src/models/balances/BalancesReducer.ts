import { Action } from "../../utils/redux";
import { Balances } from "./Balances";
import { BalancesEvent } from "./BalancesEvent";
import { BalancesState } from "./BalancesState";
import { BalancesStateMap } from "./BalancesStateMap";

const InitialState: BalancesState = { data: null, loading: false, error: null };

export const BalancesReducer = (state: BalancesState = InitialState, action: Action<Balances>) => {
    const map = {
        [ BalancesEvent.Reset ]:       () => InitialState,
        [ BalancesEvent.Show ]:        () => ({ ...state, loading: true }),
        [ BalancesEvent.ShowSuccess ]: () => ({ ...state, loading: false, error: null, data: action.payload }),
        [ BalancesEvent.ShowFailure ]: () => ({ ...state, loading: false, error: action.payload }),
    } as BalancesStateMap;
    return map[ action.type ] ? map[ action.type ]() : state;
};
