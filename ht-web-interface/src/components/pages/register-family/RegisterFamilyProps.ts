import { RouteComponentProps } from "react-router";
import { Balance, BalanceState } from "../../../models/balance";
import { Error } from "../../../models/error/Error";
import { Family, FamilyState } from "../../../models/family";
import { Success } from "../../../models/success/Success";
import { Action } from "../../../utils/redux";

export type RegisterFamilyProps = RegisterFamilyStateProps & RegisterFamilyDispatchProps & RouteComponentProps<{}>;

export interface RegisterFamilyStateProps {
    balance: BalanceState;
    family: FamilyState;
}

export interface RegisterFamilyDispatchProps {
    createFamily: (family: Family) => Action<Family>;
    createSuccess: (payload: Success) => Action<Success>;
    getBalanceByCard: (balance: Balance) => Action<Balance>;
    createError: (payload: Error) => Action<Error>;
    resetFamily: () => Action;
    resetBalance: () => Action;
}
