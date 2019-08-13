import { RouteComponentProps } from "react-router";
import { Action } from "../../../utils/redux";

import { AccountState } from "../../../models/account";
import { Balance, BalanceState } from "../../../models/balance";

export type StoreProps = StoreStateProps & StoreDispatchProps & RouteComponentProps<{}>;

export interface StoreStateProps {
    balance: BalanceState;
    account: AccountState;
}

export interface StoreDispatchProps {
    getBalanceByChain: (balance: Balance) => Action<Balance>;
    resetBalance: () => Action;
}
