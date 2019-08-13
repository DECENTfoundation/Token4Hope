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

import { StoreProps, StoreStateProps } from "./StoreProps";

import "./styles.scss";

export const Store = ({ balance, account, getBalanceByChain, resetBalance, history }: StoreProps) => {

    React.useEffect(() => {
        if (!balance.loading) {
            getBalanceByChain(account.data);
        }
        return resetBalance;
    }, [ history ]);

    return (
        <div className="store">
            <Header large={true} offset={true} logo={true}>
                <Text className="store__subheader__title">Kontostand {_.get(account.data, "name", "")}</Text>
                <Balance type={BalanceType.Primary} value={_.get(balance.data, "amount")}/>
            </Header>
            <Container fullWidth={true} offset={true}>
                <HorizontalFlow spacing="space-around" fullWidth={true} wrap="wrap">
                    <ActionBlock
                        title="Einkauf Kunde"
                        content="Öffnet den Zahlungsverkehr zwischen Kunde und Shop"
                        buttonText="Einkauf"
                        buttonLink="/payment"
                    />
                    <ActionBlock
                        title="Kontostand Kunde"
                        content="Kunden können hier Ihren Kontostand überprüfen."
                        buttonText="Kontostand einsehen"
                        buttonLink="/balance"
                    />
                </HorizontalFlow>
                <HorizontalFlow spacing="space-around" fullWidth={true} wrap="wrap">
                    <ActionBlock
                        title="Transaktionen"
                        content="Sehen Sie alle getätigten Transaktionen ein."
                        buttonText="Transaktionen Übersicht"
                        buttonLink="/transactions/history"
                    />
                    <div className="store__placeholder"/>
                </HorizontalFlow>
            </Container>
        </div>
    );
};

const mapStateToProps = (state: ContextState): StoreStateProps => ({
    account: state.account,
    balance: state.balance,
});

export const StorePage = connect(mapStateToProps, {
    getBalanceByChain: BalanceAction.getBalanceByChain,
    resetBalance:      BalanceAction.resetBalance,
})(Store);
