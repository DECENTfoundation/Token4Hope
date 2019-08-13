import { combineEpics } from "redux-observable";

import { BalanceCardActionFactory } from "../../services/balance-card/redux/BalanceCardActionFactory";
import { BalanceChainActionFactory } from "../../services/balance-chain/redux/BalanceChainActionFactory";

export const BalanceEpics = combineEpics(...[
    BalanceCardActionFactory.buildShow(),
    BalanceChainActionFactory.buildShow(),
]);
