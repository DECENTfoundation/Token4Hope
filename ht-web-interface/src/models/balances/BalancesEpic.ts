import { combineEpics } from "redux-observable";

import { BalancesActionFactory } from "../../services/balances/redux/BalancesActionFactory";

export const BalancesEpics = combineEpics(...[
    BalancesActionFactory.buildShow(),
]);
