import * as React from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";

import { HorizontalFlow } from "../../base/flow/horizontal";
import { Text } from "../../base/text";

import { SessionAction } from "../../../models/session";

import { LogoutButtonProps } from "./LogoutButtonProps";

import "./styles.scss";

const logoutIcon = require("./images/logout.svg");

export const Logout = ({ logout, history }: LogoutButtonProps) => {
    const handleLogout = () => {
        logout();
        history.push("/");
    };

    return (
        <HorizontalFlow onClick={handleLogout} className="logout-button">
            <HorizontalFlow className="logout-button__wrapper">
                <Text color="white">Logout</Text>
                <img className="logout-button__wrapper__icon" src={logoutIcon}/>
            </HorizontalFlow>
        </HorizontalFlow>
    );
};

export const LogoutButton = connect(null, {
    logout: SessionAction.signout,
})(withRouter(Logout));
