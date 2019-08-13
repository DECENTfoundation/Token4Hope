import * as _ from "lodash";
import * as React from "react";

import { connect } from "react-redux";

import { Text } from "../../base/text";
import { ActionContainer } from "../../items/action-container";
import { CardNumber } from "../../items/card-number";
import { FancyInput } from "../../items/fancy-input";
import { FancyInputPropsType } from "../../items/fancy-input/FancyInputProps";
import { ToggleVisibility } from "../../items/toggle-visibility";
import { Header } from "../../layouts/header";

import { renderClass } from "../../../helpers/classes/ClassRenderer";

import { BalanceAction } from "../../../models/balance";
import { ContextState } from "../../../models/context";
import { ErrorAction } from "../../../models/error";
import { FamilyAction } from "../../../models/family";
import { SuccessAction } from "../../../models/success";

import { ResetPinProps, ResetPinStateProps } from "./ResetPinProps";

import "./styles.scss";

const ResetPinPage = (props: ResetPinProps) => {
    const { family, editFamily, createSuccess, history, resetFamily, balance, getBalanceByCard, resetBalance, createError } = props;
    const [ pinType, setPinType ] = React.useState<FancyInputPropsType>("tel");
    const [ repeatPinType, setRepeatPinType ] = React.useState<FancyInputPropsType>("tel");
    const [ cardNumber, setCardNumber ] = React.useState("");
    const [ pin, setPin ] = React.useState("");
    const [ repeatPin, setRepeatPin ] = React.useState("");
    const [ error, setError ] = React.useState({step: null, title: null});
    const [ step, setStep ] = React.useState(0);

    const resetError = () => setError({ step: null, title: null });
    const invertRepeatPinType = () => setRepeatPinType(repeatPinType === "tel" ? "number" : "tel");
    const invertPinType = () => setPinType(pinType === "tel" ? "number" : "tel");
    const verifyCardNumber = () => getBalanceByCard({ cardNumber });
    const nextStep = () => setStep(step + 1);
    const previousStep = () => {
        setStep(step - 1);
    };

    React.useEffect(() => {
        if (cardNumber && !balance.loading) {
            if (balance.actionCompleted) {
                resetError();
                nextStep();
            } else {
                setError({step: 0, title: "Diese Hilfswerk-ID ist nicht registriert!"});
            }
        }
    }, [ balance ]);

    React.useEffect(() => {
        if (cardNumber && !_.isNull(family.data) && !family.loading) {
            createSuccess({
                cardNumber,
                headerTitle: "PIN wiederherstellen",
                title:       "PIN Nummer wurde erfolgreich geändert",
            });

            history.push("/success");
        }

        if (!_.isNil(family.error) && !family.loading) {
            createError({
                headerTitle: `${_.get(family.error, "code")} ERROR`,
                title: _.get(family.error, "response.data.error.message"),
            });
            history.push("/error");
        }
    }, [ family ]);

    React.useEffect(() => {
        resetBalance();
        resetFamily();
    }, [ history.location ]);

    const handlePinChange = () => {
        if (pin !== repeatPin) {
            return resetPinFields();
        }
        editFamily({ cardNumber, pin });
    };

    const resetPinFields = () => {
        setPinType("password");
        setRepeatPinType("password");
        setError({step: 1, title: "PIN Eingabe unterschiedlich!"});
        setPin("");
        setRepeatPin("");
        setStep(1);
    };

    const errorOnStep = (current: number) => !balance.loading && error.step === current && "shake-animation";
    const cardLayout = (
        <ActionContainer
            className={renderClass("get-balance", errorOnStep(step))}
            primaryAction={verifyCardNumber}
            primaryTitle={!balance.loading && "Weiter"}
            primaryDisabled={cardNumber.length !== 6 || balance.loading || error.step === step}
            secondaryTitle="Abbrechen"
            secondaryTo="/charity"
        >
            <Text className="mb-40" type="h6">Bitte 6-stellige Hilfswerk ID Nummer eingeben</Text>
            <FancyInput
                type="number"
                value={cardNumber}
                onChange={setCardNumber}
                length={6}
                valid={!(error.step === step)}
                {...{ resetError }}
            />
            {error.step === step && <Text type="error">{error.title}</Text>}
        </ActionContainer>
    );

    const newPin = (
        <ActionContainer
            className={error.step === step && "shake-animation"}
            offset={true}
            header={<CardNumber cardNumber={cardNumber}/>}
            primaryTitle="Weiter"
            primaryDisabled={pin.length !== 4}
            primaryAction={nextStep}
            secondaryTitle="Zurück"
            backArrow={true}
            secondaryAction={previousStep}
        >
            <Text className="mb-40" type="h6">Neuen PIN Code eingeben</Text>
            <FancyInput type={pinType} value={pin} onChange={setPin} length={4} valid={!(error.step === step)} {...{ resetError }} />
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
            primaryTitle={!family.loading && "Neue PIN bestätigen"}
            primaryDisabled={repeatPin.length !== 4 || family.loading}
            primaryAction={handlePinChange}
            secondaryTitle="Zurück"
            backArrow={true}
            secondaryAction={previousStep}
        >
            <Text className="mb-40" type="h6">Neuen PIN zur Bestätigung wiederholen</Text>
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
            <Header offset={step !== 0} title="PIN wiederherstellen" hideInfo={true}/>
            {step === 0 && cardLayout}
            {step === 1 && newPin}
            {step === 2 && repeatPinLayout}
        </>
    );
};

const mapStateToProps = (state: ContextState): ResetPinStateProps => ({
    balance: state.balance,
    family: state.family,
});

export const ResetPin = connect(mapStateToProps, {
    createError: ErrorAction.createError,
    createSuccess: SuccessAction.createSuccess,
    editFamily:    FamilyAction.edit,
    getBalanceByCard: BalanceAction.getBalanceByCard,
    resetBalance: BalanceAction.resetBalance,
    resetFamily:   FamilyAction.resetFamily,
})(ResetPinPage);
