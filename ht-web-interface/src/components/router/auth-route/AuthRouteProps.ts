import { RouteProps } from "react-router";

import { Account, AccountState } from "../../../models/account";
import { SessionState } from "../../../models/session";

import { Action } from "../../../utils/redux";
import { Role } from "../../../utils/role";

export interface AuthRouteProps extends RouteProps, AuthRouteStateProps, AuthRouteDispatchProps {
    roles?: Role[];
}

export interface AuthRouteStateProps {
    account: AccountState;
    session: SessionState;
}

export interface AuthRouteDispatchProps {
    showAccount: () => Action<Account>;
}
