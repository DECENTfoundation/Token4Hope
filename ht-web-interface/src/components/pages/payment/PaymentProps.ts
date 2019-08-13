import { RouteComponentProps } from "react-router";
import { Balance, BalanceState } from "../../../models/balance";
import { Error } from "../../../models/error/Error";
import { Family } from "../../../models/family";
import { PaymentState } from "../../../models/payment";
import { Success } from "../../../models/success/Success";
import { Action } from "../../../utils/redux";

export type PaymentProps = PaymentStateProps & PaymentDispatchProps & RouteComponentProps<{}>;

export interface PaymentStateProps {
    payment: PaymentState;
    balance: BalanceState;
}

export interface PaymentDispatchProps {
    createPayment: (family: Family) => Action<Family>;
    createSuccess: (payload: Success) => Action<Success>;
    createError: (payload: Error) => Action<Error>;
    getBalanceByCard: (balance: Balance) => Action<Balance>;
    resetBalance: () => Action;
    resetPayment: () => Action;
}
