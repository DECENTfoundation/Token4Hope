import * as _ from "lodash";
import * as React from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";

import { BalanceAction } from "../../../models/balance";
import { ErrorAction } from "../../../models/error";
import { SuccessAction } from "../../../models/success";

import { Text } from "../../base/text";
import { ActionContainer } from "../../items/action-container";
import { CardNumber } from "../../items/card-number";
import { FancyInput } from "../../items/fancy-input";
import { FancyInputPropsType } from "../../items/fancy-input/FancyInputProps";
import { ToggleVisibility } from "../../items/toggle-visibility";
import { Header } from "../../layouts/header";

import { ContextState } from "../../../models/context";
import { FamilyAction } from "../../../models/family";

import { RegisterFamilyProps, RegisterFamilyStateProps } from "./RegisterFamilyProps";

export const RegisterFamilyPage = (props: RegisterFamilyProps) => {
    const { balance, family, getBalanceByCard, resetBalance, createSuccess, createFamily, resetFamily, history, createError } = props;

    const [ pinType, setPinType ] = React.useState<FancyInputPropsType>("tel");
    const [ repeatPinType, setRepeatPinType ] = React.useState<FancyInputPropsType>("tel");
    const [ error, setError ] = React.useState({ step: null, title: null });
    const [ cardNumber, setCardNumber ] = React.useState("");
    const [ repeatPin, setRepeatPin ] = React.useState("");
    const [ pin, setPin ] = React.useState("");
    const [ step, setStep ] = React.useState(0);

    const resetError = () => setError({ step: null, title: null });
    const invertRepeatPinType = () => setRepeatPinType(repeatPinType === "tel" ? "number" : "tel");
    const invertPinType = () => setPinType(pinType === "tel" ? "number" : "tel");
    const verifyCardNumber = () => getBalanceByCard({ cardNumber });
    const previousStep = () => {
        resetBalance();
        setStep(step - 1);
    };
    const nextStep = () => setStep(step + 1);

    React.useEffect(() => {
        if (cardNumber) {
            if (balance.actionCompleted) {
                if (!_.isNil(balance.data)) {
                    setError({step: 0, title: "Für diese Hilfswerk ID existiert bereits ein Konto!"});
                    resetBalance();
                }
            } else if (!_.isNil(balance.error)) {
                    nextStep();
                    resetError();
            }
        }
    }, [balance]);

    React.useEffect(() => {
        if (cardNumber && !_.isNull(family.data) && !family.loading) {
            getBalanceByCard({ cardNumber });
            if (balance.actionCompleted) {
                createSuccess({
                    cardNumber,
                    data:        [
                        [ "Kontostand", `${balance.data.amount} T4H` ],
                    ],
                    headerTitle: "Registrierung erfolgreich!",
                    title:       "Neuer Kunde wurde registriert!",
                });
                history.push("/success");
            }
        }

        if (!_.isNil(family.error) && !family.loading) {
            resetFamily();
            createError({
                headerTitle: `${_.get(family.error, "code")} ERROR`,
                title: _.get(family.error, "response.data.error.message"),
            });
            history.push("/error");
        }
    }, [ family, balance.actionCompleted ]);

    React.useEffect(() => {
        resetFamily();
        resetBalance();
    }, [ history ]);

    const registerFamily = () => {
        if (pin !== repeatPin) {
            setError({step: 1, title: "PIN Eingabe unterschiedlich!"});
            return resetPinFields();
        }
        createFamily({
            cardNumber, pin,
        });
    };

    const resetPinFields = () => {
        setPinType("password");
        setRepeatPinType("password");
        setPin("");
        setRepeatPin("");
        setStep(1);
    };

    const cardId = (
        <ActionContainer
            className={!balance.loading && error.step === step && "shake-animation"}
            primaryTitle={!balance.loading && "Weiter"}
            primaryDisabled={cardNumber.length !== 6 || balance.loading || error.step === step}
            primaryAction={verifyCardNumber}
            secondaryTitle="Abbrechen"
            secondaryTo="/charity"
        >
            <Text className="mb-40">Bitte 6-stellige Hilfswerk ID Nummer eingeben</Text>
            <FancyInput
                value={cardNumber}
                onChange={setCardNumber}
                type="number"
                length={6}
                valid={!(error.step === step)}
                {...{ resetError }}
            />
            {error.step === step && <Text type="error">{error.title}</Text>}
        </ActionContainer>
    );

    const pinCode = (
        <ActionContainer
            className={!_.isNil(pin) && error.step === step && "shake-animation"}
            header={<CardNumber cardNumber={cardNumber}/>}
            offset={true}
            primaryTitle="Weiter"
            secondaryTitle="Zurück"
            primaryDisabled={pin.length !== 4}
            primaryAction={nextStep}
            backArrow={true}
            secondaryAction={previousStep}
        >
            {/*tslint:disable-next-line:max-line-length*/}
            <Text className="mb-40">Bitte geben Sie eine 4-stellige PIN Nummer ihrer Wahl ein. Diese Nummer wird zur Bestätigung von Zahlungen verwendet.</Text>
            <FancyInput value={pin} onChange={setPin} type={pinType} length={4} valid={!(error.step === step)} {...{ resetError }} />
            {error.step === step && <Text type="error">{error.title}</Text>}
            <ToggleVisibility
                onClick={invertPinType}
                className="mt-24"
                label={pinType === "number" ? "PIN Eingabe verstecken" : "PIN Eingabe anzeigen"}
            />
        </ActionContainer>
    );

    const repeatPinLayout = (
        <ActionContainer
            header={<CardNumber cardNumber={cardNumber}/>}
            offset={true}
            primaryTitle={!family.loading && "Neuen Kunden registrieren"}
            primaryDisabled={repeatPin.length !== 4 || family.loading}
            primaryAction={registerFamily}
            secondaryTitle="Zurück"
            backArrow={true}
            secondaryAction={previousStep}
        >
            <Text className="mb-40" type="h6">PIN Eingabe wiederholen</Text>
            <FancyInput type={repeatPinType} value={repeatPin} onChange={setRepeatPin} length={4} {...{ resetError }}/>
            <ToggleVisibility
                onClick={invertRepeatPinType}
                className="mt-24"
                label={repeatPinType === "number" ? "PIN Eingabe verstecken" : "PIN Eingabe anzeigen"}
            />
        </ActionContainer>
    );

    return (
        <>
            <Header title="Neuen Kunden registrieren" offset={step === 1 || step === 2} hideInfo={true}/>
            {step === 0 && cardId}
            {step === 1 && pinCode}
            {step === 2 && repeatPinLayout}
        </>
    );
};

const mapStateToProps = (state: ContextState): RegisterFamilyStateProps => ({
    balance: state.balance,
    family: state.family,
});

export const RegisterFamily = connect(mapStateToProps, {
    createError: ErrorAction.createError,
    createFamily: FamilyAction.create,
    createSuccess: SuccessAction.createSuccess,
    getBalanceByCard: BalanceAction.getBalanceByCard,
    resetBalance: BalanceAction.resetBalance,
    resetFamily: FamilyAction.resetFamily,
})(withRouter(RegisterFamilyPage));
