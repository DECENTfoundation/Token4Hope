import * as React from "react";

import { HashRouter, Route, Switch } from "react-router-dom";

import { Balances } from "../pages/balances";
import { ChangePassword } from "../pages/change-password";
import { CharityPage } from "../pages/charity";
import { Error } from "../pages/error";
import { GetBalancePage } from "../pages/get-balance";
import { LandingPage } from "../pages/landing";
import { LoginPage } from "../pages/login";
import { Payment } from "../pages/payment";
import { RegisterFamily } from "../pages/register-family";
import { ResetPin } from "../pages/reset-pin";
import { StorePage } from "../pages/store";
import { Success } from "../pages/success";
import { Transactions } from "../pages/transactions";

import { Role } from "../../utils/role";

import { AuthRoute } from "./auth-route";

export const Router = () => {
    return (
        <HashRouter>
            <>
                <Switch>
                    {/* Public routes */}
                    <AuthRoute path="/login" exact={true} component={LoginPage}/>
                    <AuthRoute path="/" exact={true} component={LandingPage}/>
                    <Route path="/balance" exact={true} component={GetBalancePage}/>
                    <Switch>
                        <AuthRoute path="/charity" exact={true} component={CharityPage} roles={[ Role.Charity ]}/>
                        <AuthRoute path="/register" exact={true} component={RegisterFamily} roles={[ Role.Charity ]}/>
                        <AuthRoute path="/pin/new" exact={true} component={ResetPin} roles={[ Role.Charity ]}/>
                        <AuthRoute path="/balances" exact={true} component={Balances} roles={[ Role.Charity ]}/>
                        <AuthRoute path="/transactions/history/:id" component={Transactions} roles={[ Role.Charity ]}/>

                        <AuthRoute path="/store" exact={true} component={StorePage} roles={[ Role.Store ]}/>
                        <AuthRoute path="/payment" exact={true} component={Payment} roles={[ Role.Store ]}/>

                        <AuthRoute path="/success" exact={true} component={Success} roles={[ Role.Store, Role.Charity ]}/>
                        <AuthRoute path="/error" exact={true} component={Error} roles={[ Role.Store, Role.Charity ]}/>
                        <AuthRoute path="/password/new" exact={true} component={ChangePassword} roles={[ Role.Store, Role.Charity ]}/>
                        <AuthRoute path="/transactions/history" exact={true} component={Transactions} roles={[ Role.Store, Role.Charity ]}/>
                    </Switch>
                </Switch>
            </>
        </HashRouter>
    );
};
