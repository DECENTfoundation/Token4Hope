import { RouteComponentProps } from "react-router";

import { Account, AccountState, EditAccountPayload } from "../../../models/account";
import { Success } from "../../../models/success/Success";

import { Action } from "../../../utils/redux";

export type ChangePasswordProps = ChangePasswordStateProps & ChangePasswordDispatchProps & RouteComponentProps<{}>;

export interface ChangePasswordStateProps {
    account: AccountState;
}

interface ChangePasswordDispatchProps {
    editAccount: (account: EditAccountPayload) => Action<EditAccountPayload>;
    editAccountSuccessReset: () => Action;
    showAccount: () => Action<Account>;
    resetAccountError: () => Action;
    createSuccess: (payload: Success) => Action<Success>;
}
