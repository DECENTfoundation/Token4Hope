import * as _ from "lodash";
import * as React from "react";

import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router";

import { ContextState } from "../../../models/context";
import { SuccessAction } from "../../../models/success";

import { ActionContainer } from "../../items/action-container";
import { CardNumber } from "../../items/card-number";
import { DataList } from "../../items/dataList";
import { StatusMessage } from "../../items/status-message";
import { Header } from "../../layouts/header";

import { SuccessProps, SuccessStateProps } from "./SuccessProps";

import "./styles.scss";

export const SuccessLayout = ({ success: { source }, resetSuccess, history }: SuccessProps) => {
    if (_.isNull(source)) {
        return <Redirect to="/"/>;
    }
    React.useEffect(() => resetSuccess, [ history ]);

    const { headerTitle, title, subtitle, data, cardNumber } = source;
    return (
        <>
            <Header title={headerTitle} hideInfo={true} success={true} offset={true} />
            <ActionContainer
                offset={true}
                primaryTo="/"
                primaryTitle="Zur Startseite"
                header={cardNumber && <CardNumber cardNumber={cardNumber}/>}
            >
                <StatusMessage success={true} title={title} subTitle={subtitle} vertical={source.verticalTitle}/>
                {!_.isNil(data) && <DataList data={data} fullWidth={true} />}
            </ActionContainer>
        </>
    );
};

const mapStateToProps = (state: ContextState): SuccessStateProps => ({
    success: state.success,
});

export const Success = connect(mapStateToProps, {
    resetSuccess: SuccessAction.resetSuccess,
})(withRouter(SuccessLayout));
