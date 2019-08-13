import * as _ from "lodash";

import Decimal from "decimal.js";

import { Action } from "../../utils/redux";
import { Transactions } from "./Transactions";
import { TransactionsEvent } from "./TransactionsEvent";
import { TransactionsState } from "./TransactionsState";
import { TransactionsStateMap } from "./TransactionsStateMap";

const InitialState: TransactionsState = { data: null, loading: false };

const handleDataUpdate = (state: TransactionsState, action: Action<Transactions>) => {
    const { payload } = action;

    payload.tokensSent = new Decimal(_.get(state.data, "tokensSent", 0)).plus(action.payload.tokensSent);
    payload.transactions = [ ..._.get(state.data, "transactions", []), ...payload.transactions ];

    return payload;
};

export const TransactionsReducer = (state: TransactionsState = InitialState, action: Action<Transactions>) => {
    const map = {
        [ TransactionsEvent.Reset ]:        () => InitialState,
        [ TransactionsEvent.Show ]:         () => ({ ...state, loading: true }),
        [ TransactionsEvent.ShowSuccess ]:  () => ({ ...state, loading: false, error: null, data: handleDataUpdate(state, action) }),
        [ TransactionsEvent.ShowFailure ]:  () => ({ ...state, loading: false, error: action.payload }),
        [ TransactionsEvent.ResetCursors ]: () => ({ ...state, loading: false, data: _.omit(state.data, "cursors") }),
    } as TransactionsStateMap;
    return map[ action.type ] ? map[ action.type ]() : state;
};
