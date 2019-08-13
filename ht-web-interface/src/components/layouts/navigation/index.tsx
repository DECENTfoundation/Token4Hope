import * as _ from "lodash";
import * as React from "react";

import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { Button } from "../../base/button";
import { HorizontalFlow } from "../../base/flow/horizontal";
import { VerticalFlow } from "../../base/flow/vertical";
import { Text } from "../../base/text";
import { LogoutButton } from "../../items/logout";
import { UserCard } from "../../items/user-card";

import { ButtonType } from "../../base/button/ButtonType";

import { ContextState } from "../../../models/context";

import { NavigationProps, NavigationStateProps } from "./NavigationProps";

import "./styles.scss";

const menu = require("./images/menu.svg");
const close = require("./images/close.svg");

export const NavigationLayout = ({ session, account }: NavigationProps) => {
    const [ open, setOpen ] = React.useState(false);
    const [ loggedIn, setLoggedIn ] = React.useState(true);

    React.useEffect(() => setLoggedIn(!_.isNil(session.data)), [ session, loggedIn ]);

    const toggleNav = () => setOpen(!open);

    const renderInfo = () => {
        if (!_.isNil(account.data)) {
            return (
                <>
                    <VerticalFlow fullWidth={true} spacing="flex-end" verticalAlign="flex-end" className="nav__icon">
                        <img onClick={toggleNav} className="nav__icon__hamburger " src={menu} alt=""/>
                    </VerticalFlow>
                    <HorizontalFlow className="nav__user-info no-print">
                        <UserCard email={account.data.email}/>
                        <LogoutButton/>
                    </HorizontalFlow>
                </>
            );
        }
        return null;
    };

    const renderNavContent = () => {
        if (loggedIn) {
            return (
                <VerticalFlow verticalAlign="flex-start" className="nav nav--open" fullWidth={true}>
                    <HorizontalFlow className="nav--open__top" fullWidth={true}>
                        <LogoutButton/>
                        <img onClick={toggleNav} className="nav__icon" src={close} alt=""/>
                    </HorizontalFlow>
                    <UserCard className="nav--open__user" email={account.data.email}/>
                    <Button className="full-width nav--open__button" arrow="right" type={ButtonType.Primary} to="/password/new">
                        Passwort ändern
                    </Button>
                </VerticalFlow>
            );
        }

        return (
            <VerticalFlow verticalAlign="flex-start" className="nav nav--open" fullWidth={true}>
                <HorizontalFlow className="nav--open__top" fullWidth={true}>
                    <Button className="nav--open__top__login" to="/login">Login</Button>
                    <img onClick={toggleNav} className="nav__icon" src={close} alt=""/>
                </HorizontalFlow>
                <VerticalFlow spacing="flex-end" fullWidth={true}>
                    <Link className="nav__link--phone" to="/balance">
                        <Text type="h6" color="black">Kontostand</Text>
                    </Link>
                </VerticalFlow>
            </VerticalFlow>
        );
    };

    return (
        <>
            <HorizontalFlow className="nav" spacing="flex-end">
                {loggedIn ? renderInfo() :
                    <Link className="nav__link--button" to="/login">
                        <Text type="h6" color="white">Login</Text>
                    </Link>}
            </HorizontalFlow>
            {open && renderNavContent()}
        </>
    );
};

const mapStateToProps = (state: ContextState): NavigationStateProps => ({
    account: state.account,
    session: state.session,
});

export const Navigation = connect(mapStateToProps)(NavigationLayout);
