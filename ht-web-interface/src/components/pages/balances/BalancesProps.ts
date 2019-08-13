import { Balances, BalancesState } from "../../../models/balances";
import { Action } from "../../../utils/redux";

export type BalancesProps = BalancesStateProps & BalancesDispatchProps;

export interface BalancesStateProps {
    balances: BalancesState;
}

export interface BalancesDispatchProps {
    showBalances: () => Action<Balances>;
    resetBalances: () => Action;
}
