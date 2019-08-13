import { RouteComponentProps } from "react-router";

import { Balance, BalanceState } from "../../../models/balance";
import { Error } from "../../../models/error/Error";
import { Family, FamilyState } from "../../../models/family";
import { Success } from "../../../models/success/Success";

import { Action } from "../../../utils/redux";

export type ResetPinProps = ResetPinStateProps & ResetPinDispatchProps & RouteComponentProps<{}>;

export interface ResetPinStateProps {
    balance: BalanceState;
    family: FamilyState;
}

export interface ResetPinDispatchProps {
    editFamily: (family: Family) => Action<Family>;
    createSuccess: (payload: Success) => Action<Success>;
    createError: (payload: Error) => Action<Error>;
    getBalanceByCard: (balance: Balance) => Action<Balance>;
    resetBalance: () => Action;
    resetFamily: () => Action;
}
