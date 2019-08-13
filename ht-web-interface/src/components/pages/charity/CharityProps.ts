import { RouteComponentProps } from "react-router";
import { Action } from "../../../utils/redux";

import { AccountState } from "../../../models/account";
import { Balance, BalanceState } from "../../../models/balance";

export type CharityProps = CharityStateProps & CharityDispatchProps & RouteComponentProps<{}>;

export interface CharityStateProps {
    balance: BalanceState;
    account: AccountState;
}

export interface CharityDispatchProps {
    getBalanceByChain: (balance: Balance) => Action<Balance>;
    resetBalance: () => Action;
}
