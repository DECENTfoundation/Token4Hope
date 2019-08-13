import * as _ from "lodash";
import * as React from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";

import { VerticalFlow } from "../../base/flow/vertical";
import { Text } from "../../base/text";
import { ActionContainer } from "../../items/action-container";
import { Balance } from "../../items/balance";
import { BalanceType } from "../../items/balance/BalanceType";
import { CardNumber } from "../../items/card-number";
import { FancyInput } from "../../items/fancy-input";
import { Loader } from "../../items/loader";
import { Header } from "../../layouts/header";

import { renderClass } from "../../../helpers/classes/ClassRenderer";
import { BalanceAction } from "../../../models/balance";
import { ContextState } from "../../../models/context";

import { GetBalanceProps, GetBalanceStateProps } from "./GetBalanceProps";

import "./styles.scss";

export const GetBalance = ({ balance, getBalanceByCard, history, resetBalance }: GetBalanceProps) => {
    const [ cardNumber, setCard ] = React.useState("");
    const [ firstStep, toggleStep ] = React.useState(true);
    const [ error, setError ] = React.useState(null);

    const verifyCardNumber = () => getBalanceByCard({ cardNumber });
    const resetError = () => {
        setError(null);
        setCard("");
    };

    const previousStep = () => {
        resetError();
        toggleStep(!firstStep);
    };

    React.useEffect(() => {
        if (cardNumber && !balance.loading) {
            if (balance.actionCompleted) {
                toggleStep(!firstStep);
                setError(null);
            } else {
                setError("Diese Hilfswerk-ID ist nicht registriert!");
            }
        }
    }, [ balance ]);

    React.useEffect(() => resetBalance, [ history ]);

    const inputLayout = (
        <ActionContainer
            className={renderClass("get-balance", !balance.loading && error && "shake-animation")}
            primaryAction={verifyCardNumber}
            primaryDisabled={cardNumber.length !== 6 || balance.loading || error}
            primaryTitle={!balance.loading && "Weiter"}
            secondaryTitle="Abbrechen"
            secondaryAction={history.goBack}
        >
            <Text className="get-balance__title" type="h6">Bitte 6-stellige Hilfswerk ID Nummer eingeben</Text>
            <FancyInput value={cardNumber} onChange={setCard} type="number" length={6} valid={!error} resetError={resetError}/>
            {error && <Text type="error">{error}</Text>}
        </ActionContainer>
    );
    const balanceLayout = (
        <>
            <ActionContainer
                primaryTo="/"
                secondaryAction={previousStep}
                primaryTitle="OK"
                secondaryTitle="Anderes Konto"
                className="get-balance get-balance__offset"
                header={<CardNumber cardNumber={cardNumber}/>}
            >
                <Text className="get-balance__balance-label" type="body">Verfügbar</Text>
                <Balance token={true} type={BalanceType.Primary} value={_.get(balance.data, "amount")}/>
                <VerticalFlow spacing="center">
                    <Text className="get-balance__account__label" type="body">Konto ID</Text>
                    <Text className="get-balance__account__id" type="body">
                        {_.get(balance.data, "chainName") || <Loader loading={true}/>}
                    </Text>
                </VerticalFlow>
            </ActionContainer>
            <div className="get-balance__overlay"/>
        </>
    );

    return (
        <>
            <Header title="Kunde Kontostand" hideInfo={true}/>
            {firstStep ? inputLayout : balanceLayout}
        </>
    );
};

const mapStateToProps = (state: ContextState): GetBalanceStateProps => ({
    balance: state.balance,
});

export const GetBalancePage = connect(mapStateToProps, {
    getBalanceByCard: BalanceAction.getBalanceByCard,
    resetBalance:     BalanceAction.resetBalance,
})(withRouter(GetBalance));
