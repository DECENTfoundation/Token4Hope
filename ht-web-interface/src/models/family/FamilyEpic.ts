import { combineEpics } from "redux-observable";

import { FamilyActionFactory } from "../../services/family/redux/FamilyActionFactory";

export const FamilyEpics = combineEpics(...[
    FamilyActionFactory.buildCreate(),
    FamilyActionFactory.buildEdit(),
]);
