import { RouteComponentProps } from "react-router";

import { Account, AccountState } from "../../../models/account";
import { Session, SessionState } from "../../../models/session";

import { Action } from "../../../utils/redux";

export interface LoginProps extends LoginStateProps, RouteComponentProps<{}> {
    login: (session: Session) => Action<Session>;
    showAccount: () => Action<Account>;
    resetSessionError: () => Action;
}

export interface LoginStateProps {
    session: SessionState;
    account: AccountState;
}
