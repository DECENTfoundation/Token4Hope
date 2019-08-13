import { combineEpics } from "redux-observable";

import { SessionActionFactory } from "../../services/session/redux/SessionActionFactory";

export const SessionEpics = combineEpics(...[
    SessionActionFactory.buildCurrent(),
    SessionActionFactory.buildSignin(),
    SessionActionFactory.buildSignout(),
]);
