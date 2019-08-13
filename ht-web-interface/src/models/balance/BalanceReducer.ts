import { Action } from "../../utils/redux";
import { Balance } from "./Balance";
import { BalanceEvent } from "./BalanceEvent";
import { BalanceState } from "./BalanceState";
import { BalanceStateMap } from "./BalanceStateMap";

const InitialState: BalanceState = { data: null, loading: false, error: null };

export const BalanceReducer = (state: BalanceState = InitialState, action: Action<Balance>) => {
    const map = {
        [ BalanceEvent.Reset ]:                 () => InitialState,
        [ BalanceEvent.ShowByCard ]:            () => ({ ...state, loading: true }),
        /*tslint:disable-next-line:max-line-length*/
        [ BalanceEvent.ShowByCardSuccess ]:     () => ({ ...state, loading: false, actionCompleted: true, error: null, data: action.payload }),
        /*tslint:disable-next-line:max-line-length*/
        [ BalanceEvent.ShowByCardFailure ]:     () => ({ ...state, loading: false, actionCompleted: false, error: action.payload, data: null }),
        [ BalanceEvent.ShowByChain ]:           () => ({ ...state, loading: true }),
        /*tslint:disable-next-line:max-line-length*/
        [ BalanceEvent.ShowByChainSuccess ]:    () => ({ ...state, loading: false, actionCompleted: true, error: null, data: action.payload }),
        [ BalanceEvent.ShowByChainFailure ]:    () => ({ ...state, loading: false, actionCompleted: false, error: action.payload }),
    } as BalanceStateMap;
    return map[ action.type ] ? map[ action.type ]() : state;
};
