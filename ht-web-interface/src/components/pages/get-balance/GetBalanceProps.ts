import { RouteComponentProps } from "react-router";
import { Action } from "../../../utils/redux";

import { Balance, BalanceState } from "../../../models/balance";

export type GetBalanceProps = GetBalanceStateProps & GetBalanceDispatchProps & RouteComponentProps<{}>;

export interface GetBalanceStateProps {
    balance: BalanceState;
}

export interface GetBalanceDispatchProps {
    getBalanceByCard: (balance: Balance) => Action<Balance>;
    resetBalance: () => Action;
}
