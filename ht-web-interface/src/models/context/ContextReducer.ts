import { combineReducers } from "redux";

import { filterActions } from "redux-ignore";

import { LifecycleEvent } from "../../utils/lifecycle";
import { Action } from "../../utils/redux";

import { AccountEvent, AccountReducer, AccountState } from "../account";
import { BalanceEvent, BalanceReducer, BalanceState } from "../balance";
import { BalancesEvent, BalancesReducer, BalancesState } from "../balances";
import { ErrorEvent, ErrorReducer, ErrorState } from "../error";
import { FamilyEvent, FamilyReducer, FamilyState } from "../family";
import { PaymentEvent, PaymentReducer, PaymentState } from "../payment";
import { SessionEvent, SessionReducer, SessionState } from "../session";
import { SuccessEvent, SuccessReducer, SuccessState } from "../success";
import { TransactionsEvent, TransactionsReducer, TransactionsState } from "../transactions";

import { ContextState } from "./ContextState";

// tslint:disable:max-line-length
const Context = combineReducers<ContextState>({
    account:      filterActions<AccountState>(AccountReducer, (action) => action.type.match(AccountEvent.Name)),
    balance:      filterActions<BalanceState>(BalanceReducer, (action) => action.type.match(BalanceEvent.Name)),
    balances:     filterActions<BalancesState>(BalancesReducer, (action) => action.type.match(BalancesEvent.Name)),
    error:        filterActions<ErrorState>(ErrorReducer, (action) => action.type.match(ErrorEvent.Name) || action.type.match(LifecycleEvent.Reset)),
    family:       filterActions<FamilyState>(FamilyReducer, (action) => action.type.match(FamilyEvent.Name)),
    payment:      filterActions<PaymentState>(PaymentReducer, (action) => action.type.match(PaymentEvent.Name)),
    session:      filterActions<SessionState>(SessionReducer, (action) => action.type.match(SessionEvent.Name)),
    success:      filterActions<SuccessState>(SuccessReducer, (action) => action.type.match(SuccessEvent.Name) || action.type.match(LifecycleEvent.Reset)),
    transactions: filterActions<TransactionsState>(TransactionsReducer, (action) => action.type.match(TransactionsEvent.Name)),
});
// tslint:enable:max-line-length

export const ContextReducer = (state: ContextState, action: Action) => {
    if (action.type === SessionEvent.Signout) {
        state = undefined; // Reset to initial state
    }
    return Context(state, action);
};
