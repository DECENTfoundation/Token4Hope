import { TransactionsState } from "./TransactionsState";

export interface TransactionsStateMap {
    [ key: string ]: () => TransactionsState;
}
