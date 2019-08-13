import { BalanceState } from "./BalanceState";

export interface BalanceStateMap {
    [ key: string ]: () => BalanceState;
}
