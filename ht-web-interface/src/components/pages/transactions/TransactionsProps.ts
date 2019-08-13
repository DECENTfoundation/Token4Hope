import { RouteComponentProps } from "react-router";
import { Account, AccountState } from "../../../models/account";
import { Error } from "../../../models/error/Error";
import { TransactionsState } from "../../../models/transactions";

import { Action } from "../../../utils/redux";

export type TransactionsProps = TransactionsStateProps & TransactionsDispatchProps & RouteComponentProps<{}>;

export interface TransactionsStateProps {
    transactions: TransactionsState;
    account: AccountState;
}

export interface TransactionsDispatchProps {
    createError: (payload: Error) => Action<Error>;
    showTransactions: (payload: Account) => Action<Account>;
    resetTransactions: () => Action;
    resetCursors: () => Action;
}
