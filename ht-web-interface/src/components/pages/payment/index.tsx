import Decimal from "decimal.js";
import * as _ from "lodash";
import * as React from "react";

import { LegacyRef } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { BalanceAction } from "../../../models/balance";
import { ContextState } from "../../../models/context";
import { ErrorAction } from "../../../models/error";
import { PaymentAction } from "../../../models/payment";
import { SuccessAction } from "../../../models/success";

import { HorizontalFlow } from "../../base/flow/horizontal";
import { Input } from "../../base/input";
import { Text } from "../../base/text";
import { ActionContainer } from "../../items/action-container";
import { CardNumber } from "../../items/card-number";
import { DataList } from "../../items/dataList";
import { FancyInput } from "../../items/fancy-input";
import { ToggleVisibility } from "../../items/toggle-visibility";

import { Header } from "../../layouts/header";

import { renderClass } from "../../../helpers/classes/ClassRenderer";
import { parseDecimal } from "../../../utils/decimal";

import { PaymentProps, PaymentStateProps } from "./PaymentProps";

import "./styles.scss";

const PaymentPage = (props: PaymentProps) => {
    const { payment, createPayment, createSuccess, resetPayment, balance, getBalanceByCard, resetBalance, history, createError } = props;
    const [ cardNumber, setCard ] = React.useState("");
    const [ pin, setPin ] = React.useState(null);
    const [ visibility, setVisibility ] = React.useState(false);
    const [ amount, setAmount ] = React.useState("");
    const [ step, setStep ] = React.useState(0);
    const [ error, setError ] = React.useState({step: null, title: null});

    const pinInputRef: LegacyRef<FancyInput> = React.createRef();

    const resetError = () => setError({ step: null, title: null });
    const nextStep = () => setStep(step + 1);
    const previousStep = () => {
        setAmount(step === 1 ? "" : amount);
        setStep(step - 1);
    };
    const toggleVisibility = () => setVisibility(!visibility);
    const verifyCardNumber = () => getBalanceByCard({ cardNumber });

    const isValidPin = (!_.isNil(pin) && pin.toString().length === 4);

    const setAmountWithDecimal = (value: any) => {
        const regex = new RegExp(/^\d*(\.\d{0,2})?$/);

        if (regex.test(value)) {
            setAmount(value);
        }
    };

    React.useEffect(() => {
        if (cardNumber && !balance.loading) {
            if (balance.actionCompleted) {
                resetError();
                nextStep();
            } else {
                setError({ step, title: "Diese Hilfswerk-ID ist nicht registriert!" });
            }
        }
    }, [balance]);

    React.useEffect(() => {
        if (cardNumber && !_.isNull(payment.data) && !payment.loading) {
            const link = `<a href="https://explorer.decent.ch/account/${payment.data.senderAddress}" target="_blank">DCore Blockchain</a>`;
            createSuccess({
                cardNumber,
                data: [
                    [ "Betrag", `${parseDecimal(amount)} Token` ],
                    [ "Sender", payment.data.senderAddress ],
                    [ "Empfänger", payment.data.receiverAddress ],
                    [ "Neuer Kunde Kontostand", `${parseDecimal(payment.data.remainingBalance)} Token` ],
                ],
                headerTitle: "Einkauf Kunde",
                subtitle: `Diese Transaktion lässt sich öffentlich auf der ${link} einsehen`,
                title: "Zahlung wurde erfolgreich durchgeführt",
                verticalTitle: true,
            });
            history.push("/success");
        }

        if (pin && !_.isNil(payment.error) && !payment.loading) {
            if (_.get(payment.error, "code") === "422") {
                setError({ step: 2, title: "PIN code falsch." });
            } else {
                resetPayment();
                createError({
                    headerTitle: `${_.get(payment.error, "code")} ERROR`,
                    title: _.get(payment.error, "response.data.error.message"),
                });
                history.push("/error");
            }
        }
    }, [ payment ]);

    React.useEffect(() => {
        return () => {
            resetPayment();
            resetBalance();
        };
    }, [ history ]);

    React.useEffect(() => {
        if (payment.actionCreated) {
            resetPayment();
        }
    }, [ pin ]);

    const paymentAction = () => {
        pinInputRef.current.blurFocus();
        createPayment({ cardNumber, pin, amount });
    };
    const errorOnStep = (current: number) => !payment.loading && !balance.loading && error.step === current && "shake-animation";
    const inputAmount = amount || "0";
    const invalidInput = new Decimal(_.get(props.balance.data, "amount", "0")).lessThan(new Decimal(inputAmount));

    const cardEnter = (
        <ActionContainer
            className={renderClass("get-balance", errorOnStep(step))}
            primaryAction={verifyCardNumber}
            primaryDisabled={cardNumber.length !== 6 || balance.loading || error.step === step}
            primaryTitle={!balance.loading && "Weiter"}
            secondaryTitle="Abbrechen"
            secondaryTo="/store"
        >
            <Text className="get-balance__title" type="h6">Bitte 6-stellige Hilfswerk ID Nummer eingeben</Text>
            <FancyInput value={cardNumber} onChange={setCard} type="number" length={6} valid={!(error.step === step)} {...{ resetError }} />
            {error.step === step && <Text type="error">{error.title}</Text>}
        </ActionContainer>
    );
    const amountEnter = (
        <ActionContainer
            primaryAction={nextStep}
            primaryDisabled={invalidInput  || !new Decimal(inputAmount).greaterThan(0)}
            primaryTitle="Weiter"
            secondaryTitle="Zurück"
            secondaryAction={previousStep}
            className="get-balance"
            header={<CardNumber cardNumber={cardNumber}/>}
            backArrow={true}
            offset={true}
        >
            <Text className="mb-32" type="h6">Bitte geben sie den Betrag ein, der vom Kunden in Token beglichen wird</Text>
            <Input
                type="number"
                className="withdraw__amount"
                placeholder="Betrag"
                autoFocus={true}
                onChange={setAmountWithDecimal}
                value={amount}
                invalid={invalidInput}
            />
            <DataList fullWidth={true} data={[ [ "Aktueller Kontostand", `${parseDecimal(_.get(balance.data, "amount", "0"))} Token` ] ]}/>
        </ActionContainer>
    );
    const pinEnter = (
        <ActionContainer
            primaryTitle={!payment.loading && "Zahlen"}
            primaryAction={paymentAction}
            primaryDisabled={!isValidPin || payment.actionCreated}
            secondaryTitle="Zurück"
            secondaryAction={previousStep}
            backArrow={true}
            className={renderClass("get-balance get-balance__offset", errorOnStep(step))}
            header={<CardNumber cardNumber={cardNumber}/>}
            offset={true}
        >
            <Text className="get-balance__title" type="h6">Kunde: Geben Sie Ihren PIN ein und drücken sie auf "Zahlen"</Text>
            <HorizontalFlow verticalAlign="flex-start">
                <Text className="get-balance mb-16" type="h3">{parseDecimal(amount || 0)}</Text>
                <Text type="caption" className="payment__amount--currency">Token</Text>
            </HorizontalFlow>
            <FancyInput
                value={pin}
                ref={pinInputRef}
                onChange={setPin}
                type={visibility ? "number" : "tel"}
                length={4}
                valid={!(error.step === step)}
                {...{ resetError }}
            />
            {error.step === step && <Text type="error">{error.title}</Text>}
            {/* tslint:disable-next-line:max-line-length */}
            <ToggleVisibility className="mt-32" label={visibility ? "PIN Eingabe verstecken" : "PIN Eingabe anzeigen"} onClick={toggleVisibility}/>
        </ActionContainer>
    );

    return (
        <>
            <Header title="Einkauf Kunde" offset={step !== 0} hideInfo={true}/>
            {step === 0 && cardEnter}
            {step === 1 && amountEnter}
            {step === 2 && pinEnter}
        </>
    );
};

const mapStateToProps = (state: ContextState): PaymentStateProps => ({
    balance: state.balance,
    payment: state.payment,
});

export const Payment = connect(mapStateToProps, {
    createError: ErrorAction.createError,
    createPayment: PaymentAction.create,
    createSuccess: SuccessAction.createSuccess,
    getBalanceByCard: BalanceAction.getBalanceByCard,
    resetBalance: BalanceAction.resetBalance,
    resetPayment: PaymentAction.resetPayment,
})(withRouter(PaymentPage));
