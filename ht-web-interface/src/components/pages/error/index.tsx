import * as _ from "lodash";
import * as React from "react";

import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router";

import { ContextState } from "../../../models/context";
import { ErrorAction } from "../../../models/error";

import { ActionContainer } from "../../items/action-container";
import { StatusMessage } from "../../items/status-message";
import { Header } from "../../layouts/header";

import { ErrorProps, ErrorStateProps } from "./ErrorProps";

import "./styles.scss";

export const ErrorLayout = ({ error: { source }, resetError, history }: ErrorProps) => {
    if (_.isNil(source)) {
        return <Redirect to="/"/>;
    }

    React.useEffect(() => resetError, [ history ]);

    const { headerTitle, subtitle } = source;

    return (
        <>
            <Header title={headerTitle} hideInfo={true} error={true} offset={true} />
            <ActionContainer offset={true} primaryTo="/" primaryTitle="Zur Startseite">
                {/* tslint:disable:max-line-length */}
                <StatusMessage success={false} title={"Ein Problem ist aufgetreten. Bitte versuchen Sie es später noch einmal. Falls das Problem immer noch auftritt, wenden Sie sich an einen Systemadministrator."} subTitle={subtitle}/>
            </ActionContainer>
        </>
    );
};

const mapStateToProps = (state: ContextState): ErrorStateProps => ({
    error: state.error,
});

export const Error = connect(mapStateToProps, {
    resetError: ErrorAction.resetError,
})(withRouter(ErrorLayout));
