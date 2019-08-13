import { AccountState } from "./AccountState";

export interface AccountStateMap {
    [ key: string ]: () => AccountState;
}
