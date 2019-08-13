import { BalancesState } from "./BalancesState";

export interface BalancesStateMap {
    [ key: string ]: () => BalancesState;
}
