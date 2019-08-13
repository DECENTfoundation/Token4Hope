import * as _ from "lodash";
import * as React from "react";

import { connect } from "react-redux";
import { Redirect, Route } from "react-router";

import { AccountAction } from "../../../models/account";
import { ContextState } from "../../../models/context";

import { Role } from "../../../utils/role";

import { AuthRouteProps, AuthRouteStateProps } from "./AuthRouteProps";

const Auth = ({ account, session, roles, showAccount, path, ...rest }: AuthRouteProps) => {
    if (path === "/login" && _.isNil(session.data)) {
        return (
            <Route  path={path} {...rest} />
        );
    }

    if ((!session.loading && _.isNil(session.data)) && _.isNil(roles)) {
        return (
            <Route path={path} {...rest} />
        );
    }

    React.useEffect(() => {
        if (!_.isNil(session.data) && _.isNull(account.data) && !account.loading) {
            showAccount();
        }
    });

    if (_.isNull(session.data) && !session.loading) {
        return <Redirect to="/"/>;
    }

    if (!_.isNull(account.data) && !account.loading) {
        if (_.includes(roles, account.data.roles[ 0 ])) {
            return (
                <Route  path={path} {...rest} />
            );
        }

        return <Redirect to={account.data.roles[ 0 ] === Role.Charity ? "/charity" : "/store"}/>;

    }

    return null;

};

const mapStateToProps = (state: ContextState): AuthRouteStateProps => ({
    account: state.account,
    session: state.session,
});

export const AuthRoute = connect(mapStateToProps, {
    showAccount: AccountAction.showAccount,
})(Auth);
