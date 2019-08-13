import { combineEpics } from "redux-observable";

import { AccountActionFactory } from "../../services/account/redux/AccountActionFactory";

export const AccountEpics = combineEpics(...[
    AccountActionFactory.buildShow(),
    AccountActionFactory.buildEdit(),
]);
