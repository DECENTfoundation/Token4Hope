import * as _ from "lodash";
import * as React from "react";

import { connect } from "react-redux";

import { Container } from "../../base/container";
import { HorizontalFlow } from "../../base/flow/horizontal";
import { Text } from "../../base/text";
import { ActionBlock } from "../../items/action-block";
import { Balance } from "../../items/balance";
import { BalanceType } from "../../items/balance/BalanceType";
import { Header } from "../../layouts/header";

import { BalanceAction } from "../../../models/balance";
import { ContextState } from "../../../models/context";

import { CharityProps, CharityStateProps } from "./CharityProps";

import "./styles.scss";

export const Charity = ({ balance, account, getBalanceByChain, resetBalance, history }: CharityProps) => {

    React.useEffect(() => {
        if (!balance.loading) {
            getBalanceByChain(account.data);
        }
    }, [ history ]);

    React.useEffect(() => resetBalance, [ account.data ]);

    return (
        <div className="charity">
            <Header large={true} offset={true} logo={true}>
                <Text className="charity__subheader__title">Gesamt in Charity</Text>
                <Balance type={BalanceType.Primary} value={_.get(balance.data, "amount")} />
            </Header>
            <Container fullWidth={true} offset={true}>
                <HorizontalFlow spacing="space-around" fullWidth={true} wrap="wrap">
                    <ActionBlock
                        title="Neuen Kunden registrieren"
                        content="Registrieren Sie einen neuen Kunden für T4H tokens."
                        buttonText="Neuen Kunden registrieren"
                        buttonLink="/register"
                    />
                    <ActionBlock
                        title="Bilanzen"
                        content="Sehen Sie auf Nachfrage Token-Kontostände von Kunden ein."
                        buttonText="Kontostand einsehen"
                        buttonLink="/balances"
                    />
                </HorizontalFlow>
                <HorizontalFlow spacing="space-around" fullWidth={true} wrap="wrap">
                    <ActionBlock
                        title="PIN wiederherstellen"
                        content="Stellen Sie einen verlorenen PIN wieder her."
                        buttonText="PIN wiederherstellen"
                        buttonLink="/pin/new"
                    />
                    <ActionBlock
                        title="Transaktionen"
                        content="Sehen Sie alle getätigten Transaktionen ein."
                        buttonText="Transaktionen Übersicht"
                        buttonLink="/transactions/history"
                    />
                </HorizontalFlow>
            </Container>
        </div>
    );
};

const mapStateToProps = (state: ContextState): CharityStateProps => ({
    account: state.account,
    balance: state.balance,
});

export const CharityPage = connect(mapStateToProps, {
    getBalanceByChain: BalanceAction.getBalanceByChain,
    resetBalance: BalanceAction.resetBalance,
})(Charity);
