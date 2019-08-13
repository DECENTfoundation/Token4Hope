import { combineEpics } from "redux-observable";

import { TransactionsActionFactory } from "../../services/transactions/redux/TransactionsActionFactory";

export const TransactionsEpics = combineEpics(...[
    TransactionsActionFactory.buildShow(),
]);
