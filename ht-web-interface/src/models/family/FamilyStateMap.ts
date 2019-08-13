import { FamilyState } from "./FamilyState";

export interface FamilyStateMap {
    [ key: string ]: () => FamilyState;
}
