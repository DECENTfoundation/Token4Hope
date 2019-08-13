import * as _ from "lodash";
import * as React from "react";

import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { BalancesAction } from "../../../models/balances";
import { ContextState } from "../../../models/context";

import { Container } from "../../base/container";
import { HorizontalFlow } from "../../base/flow/horizontal";
import { VerticalFlow } from "../../base/flow/vertical";
import { Table } from "../../base/table";
import { TableBody } from "../../base/table/body";
import { TableCell } from "../../base/table/cell";
import { TableHead } from "../../base/table/head";
import { TableHeadCell } from "../../base/table/head-cell";
import { TableRow } from "../../base/table/row";
import { Text } from "../../base/text";
import { TablePlaceholder } from "../../items/table-placeholder";

import { TooltipBalance } from "../../items/tooltip-balance";

import { Header } from "../../layouts/header";

import { parseDecimal } from "../../../utils/decimal";

import { BalancesProps, BalancesStateProps } from "./BalancesProps";

import "./styles.scss";

const BalancesLayout = ({showBalances, balances, resetBalances}: BalancesProps) => {

    React.useEffect(() => {
        if (_.isNull(balances.data) && !balances.loading) {
            showBalances();
        }
    });

    React.useEffect(() => resetBalances, [ history ]);

    const renderRows = () => {
        return balances.data.accounts.map(({ account, chainName, balance }, key) => (
            <TableRow key={key}>
                <TableCell><Link to={`/transactions/history/${chainName}?name=${account}`}>{chainName}</Link></TableCell>
                <TableCell>{account}</TableCell>
                <TableCell>{parseDecimal(balance)} T4H</TableCell>
            </TableRow>
        ));
    };

    return (
        <>
            <Header title="Bilanzen" backAction={true} large={true}/>
            <Container fullWidth={true} className="balances">
                <VerticalFlow fullWidth={true} verticalAlign="space-around">
                    <HorizontalFlow fullWidth={true} className="balances__info" wrap="wrap" spacing="flex-start" verticalAlign="flex-start">
                        <TooltipBalance
                            value={_.get(balances.data, "familyTokens")}
                            className="mr-64"
                            label="Tokens von Kunden, die in Shops benützt werden können."
                            title="Gesamt an Karten"
                        />
                        <TooltipBalance
                            value={_.get(balances.data, "storeTokens")}
                            className="mr-64"
                            label="Tokens von Shops, die über die Charity in EUR zurück getauscht werden können."
                            title="Gesamt in Geschäften"
                        />
                        <TooltipBalance
                            value={_.get(balances.data, "charityTokens")}
                            className="mr-64"
                            label="Tokens der Charity, die bei Kontoerstellung automatisch an den Kunden verteilt werden können."
                            title="Aktueller Kontostand"
                        />
                    </HorizontalFlow>
                    <Text className="balances__table__title" type="h4">Liste aller Konten</Text>
                    <Table className="balances__table" fullWidth={true} striped={true}>
                        <TableHead>
                            <TableHeadCell>Kontoname</TableHeadCell>
                            <TableHeadCell>Konto ID</TableHeadCell>
                            <TableHeadCell>Kontostand</TableHeadCell>
                        </TableHead>
                        <TableBody>
                            {_.isNil(balances.data) || balances.loading ? <TablePlaceholder rows={6} columns={3} /> : renderRows()}
                        </TableBody>
                    </Table>
                </VerticalFlow>
            </Container>
        </>
    );
};

const mapStateToProps = (state: ContextState): BalancesStateProps => ({
    balances: state.balances,
});

export const Balances = connect(mapStateToProps, {
    resetBalances: BalancesAction.resetBalances,
    showBalances: BalancesAction.showBalances,
})(BalancesLayout);
