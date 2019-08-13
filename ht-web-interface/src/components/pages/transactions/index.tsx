import "react-dates/initialize";

import * as _ from "lodash";
import * as moment from "moment";
import * as Qs from "qs";
import * as React from "react";

import { CSVLink } from "react-csv";
import { DateRangePicker } from "react-dates";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { ErrorAction } from "../../../models/error";

import { Button } from "../../base/button";
import { ButtonType } from "../../base/button/ButtonType";
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
import { CardNumber } from "../../items/card-number";
import { TablePlaceholder } from "../../items/table-placeholder";
import { TooltipBalance } from "../../items/tooltip-balance";
import { Header } from "../../layouts/header";

import { ContextState } from "../../../models/context";
import { TransactionsAction } from "../../../models/transactions";

import { renderClassConditions } from "../../../helpers/classes/ClassRenderer";
import { PaginationParams } from "../../../utils/data";
import { parseDecimal } from "../../../utils/decimal";
import { ObjectKeyLiteral } from "../../../utils/foundation/class";
import { Role } from "../../../utils/role";

import { TransactionsProps, TransactionsStateProps } from "./TransactionsProps";

import "react-dates/lib/css/_datepicker.css";
import "./styles.scss";

const csvHeaders = require("./csvHeaders.json");
const exportIcon = require("./images/export.svg");

const TransactionsLayout = ({ transactions, resetTransactions, showTransactions, createError, history, ...props }: TransactionsProps) => {
    const { chainName, roles, name } = props.account.data;
    const { loading, error } = transactions;

    const PAGE_LIMIT = 50;

    const [ accountDetail, setAccountDetail ] = React.useState({ id: null, name: null });
    const [ focusedInput, setFocusedInput ] = React.useState(null);
    const [ { start, end }, setDates ] = React.useState({ start: null, end: null });
    const [ cursor, setCursor ] = React.useState(null);

    const { pathname, search } = history.location;
    const id = search && pathname.split("/").pop();
    const accountName = _.get(Qs.parse(search), "?name");
    const isFamilyAccount = !isNaN(parseInt(accountName || "-", 10));
    const isStoreAccount = _.includes(roles, Role.Store) || (accountDetail.name && !isFamilyAccount) || !_.isNil(accountName);
    const charityHeader = _.includes(roles, Role.Charity) && _.isNil(accountName) && `Konto: ${name}`;
    const params: PaginationParams = { limit: PAGE_LIMIT };

    React.useEffect(() => {
        if (!loading && !_.isNil(transactions.data)) {
            setAccountDetail({ id, name: id ? accountName : null });
            showTransactions({ chainName: id || chainName, params: { limit: PAGE_LIMIT } });
        }
        return resetTransactions;
    }, [ history.location ]);

    React.useEffect(() => {
        if (_.isNil(start) && _.isNil(end)) {
            resetTransactions();
            showTransactions({ chainName: id || chainName, params });
        }

        if (!_.isNil(start) && !_.isNil(end)) {
            resetTransactions();
            params.from = moment(start).startOf("day").toISOString();
            params.to = moment(end).endOf("day").toISOString();

            showTransactions({ chainName: id || chainName, params });
        }
    }, [ start, end ]);

    React.useEffect(() => {
        if (!_.isNil(start) && !_.isNil(end)) {
            params.from = moment(start).startOf("day").toISOString();
            params.to = moment(end).endOf("day").toISOString();
        }

        if (!_.isNil(cursor)) {
            params.cursor = cursor;
            showTransactions({ chainName: id || chainName, params });
        }

        return () => setCursor(null);

    }, [ cursor ]);

    React.useEffect(() => {
        if (!_.isNil(error)) {
            createError({
                headerTitle: `${_.get(error, "code")} ERROR`,
                title:       _.get(error, "response.data.error.message"),
            });
            history.push("/error");
        }

    }, [ error ]);

    const renderRows = () => {
        return transactions.data.transactions.map(({ timestamp, accountChainName, account, amount, found, direction }, key) => (
            <TableRow key={key}>
                <TableCell>
                    <span>{moment(timestamp).format("D. MMMM YYYY, hh:mm")}</span>
                </TableCell>
                <TableCell>
                    {_.includes(roles, Role.Charity) && found ? <Link to={`/transactions/history/${accountChainName}?name=${account}`}>
                        {accountChainName}
                    </Link> : accountChainName}
                </TableCell>
                <TableCell>{account ? account : "-"}</TableCell>
                <TableCell>
                    <span className={renderClassConditions("transactions__table__cell", { [ direction ]: direction })}>
                        {parseDecimal(amount)} T4H
                    </span>
                </TableCell>
            </TableRow>
        ));
    };

    const exportButton = (data: ObjectKeyLiteral[]) => {
        if (data) {
            data = data.map(($) => {
                return {
                    ...$,
                    account: `'${$.account}'`,
                };
            });
        }
        return (
            <CSVLink
                className="no-print"
                data={_.isNil(data) ? [] : data}
                headers={csvHeaders}
                filename={`${chainName}_transactions.csv`}
                separator={";"}
            >
                <Button type={ButtonType.Tertiary}>
                    <img src={exportIcon} className="mr-8"/> Export to .csv
                </Button>
            </CSVLink>
        );
    };

    const handleLoadMore = () => {
        const nextToken = _.get(transactions.data, "cursors.next", null);

        if (!_.isNull(nextToken)) {
            setCursor(nextToken);
        } else {
            setCursor(null);
        }
    };
    return (
        <>
            <Header title={_.includes(roles, Role.Store) ? `Konto: ${name}` : charityHeader} backAction={true} large={true}>
                <VerticalFlow spacing="center">
                    <Text type="h3">
                        {isFamilyAccount ? <CardNumber cardNumber={accountName} strong={true}/> : `Konto: ${accountName}`}
                    </Text>
                    <Text type={id ? "h5" : "h3"}>{id || chainName}</Text>
                </VerticalFlow>
            </Header>
            <Container fullWidth={true} className="transactions">
                <VerticalFlow fullWidth={true} verticalAlign="space-around">
                    <HorizontalFlow
                        fullWidth={true}
                        className="transactions__info"
                        wrap="wrap"
                        spacing="flex-start"
                        verticalAlign="flex-start"
                    >
                        <TooltipBalance
                            value={_.get(transactions.data, "balance")}
                            title="Aktueller Kontostand"
                            label={isFamilyAccount || isStoreAccount ? `Token Betrag des ${isFamilyAccount ? "Kunden" : "Shops"}` :
                                "Tokens der Charity, die bei Kontoerstellung automatisch an den Kunden verteilt werden können"}
                            className="mr-64"
                        />
                        {!isFamilyAccount && <>
                            <TooltipBalance
                                value={_.get(transactions.data, isStoreAccount ? "tokensReceived" : "tokensSent")}
                                title={isStoreAccount ? "Tokens erhalten" : "Tokens gesendet"}
                                // tslint:disable-next-line:max-line-length
                                label={isStoreAccount ? "Tokens die von Kunden erhalten wurden" : "Tokens der Charity, die an Kunden gesendet wurden"}
                                className="mr-64"
                            />
                        </>}
                    </HorizontalFlow>
                    <HorizontalFlow wrap="wrap" fullWidth={true} spacing="space-between">
                        <Text className="transactions__table__title" type="h4">Transaktionen</Text>
                        <HorizontalFlow wrap="wrap">
                            <DateRangePicker
                                hideKeyboardShortcutsPanel={true}
                                showClearDates={true}
                                showDefaultInputIcon={true}
                                minimumNights={0}
                                displayFormat="DD.MM.YYYY"
                                startDate={start}
                                startDateId="your_unique_start_date_id"
                                firstDayOfWeek={1}
                                endDate={end}
                                endDateId="your_unique_end_date_id"
                                orientation={window.matchMedia("(max-width: 400px)").matches ? "vertical" : "horizontal"}
                                // tslint:disable-next-line:jsx-no-lambda
                                isOutsideRange={() => false}
                                // tslint:disable-next-line:jsx-no-lambda
                                onDatesChange={({ startDate, endDate }) => setDates({ start: startDate, end: endDate })}
                                focusedInput={focusedInput}
                                // tslint:disable-next-line:jsx-no-lambda
                                onFocusChange={($) => setFocusedInput($)}
                            />
                            {exportButton(_.get(transactions.data, "transactions", null))}
                        </HorizontalFlow>
                    </HorizontalFlow>
                    <Table className="transactions__table" fullWidth={true} striped={true}>
                        <TableHead>
                            <TableHeadCell>Datum und Uhrzeit</TableHeadCell>
                            <TableHeadCell>Hilfswerk ID</TableHeadCell>
                            <TableHeadCell>Kontoname</TableHeadCell>
                            <TableHeadCell>Betrag</TableHeadCell>
                        </TableHead>
                        <TableBody>
                            {/* tslint:disable:max-line-length */}
                            {_.isNil(transactions.data) || loading ? <TablePlaceholder rows={_.get(transactions, "data.transactions", []).length + PAGE_LIMIT} columns={4}/> : renderRows()}
                        </TableBody>
                    </Table>
                </VerticalFlow>
                {!_.isNil(_.get(transactions, "data.cursors.next", null)) ? (
                    <Button onClick={handleLoadMore} className="mt-16" type={ButtonType.Secondary} arrow="bottom">Mehr Laden ...</Button>
                ) : null}
            </Container>
        </>
    );
};

const mapStateToProps = (state: ContextState): TransactionsStateProps => ({
    account:      state.account,
    transactions: state.transactions,
});

export const Transactions = connect(mapStateToProps, {
    createError:       ErrorAction.createError,
    resetCursors:      TransactionsAction.resetCursors,
    resetTransactions: TransactionsAction.resetTransactions,
    showTransactions:  TransactionsAction.showTransactions,
})(TransactionsLayout);
