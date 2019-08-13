import * as _ from "lodash";
import * as React from "react";

import { connect } from "react-redux";

import { Input } from "../../base/input";
import { Label } from "../../base/label";
import { Text } from "../../base/text";
import { ActionContainer } from "../../items/action-container";
import { ToggleVisibility } from "../../items/toggle-visibility";
import { Header } from "../../layouts/header";

import { InputType } from "../../base/input/InputProps";

import { AccountAction } from "../../../models/account";
import { ContextState } from "../../../models/context";
import { SuccessAction } from "../../../models/success";

import { ChangePasswordProps, ChangePasswordStateProps } from "./ChangePasswordProps";

import "./styles.scss";

export const ChangePasswordLayout = (props: ChangePasswordProps) => {

    const [ oldPassword, setOldPassword ] = React.useState("");
    const [ newPassword, setNewPassword ] = React.useState("");
    const [ repeatNewPassword, setRepeatNewPassword ] = React.useState("");

    const [ passwordType, setPasswordType ] = React.useState<InputType>("password");

    const [ error, setError ] = React.useState({ type: null, title: null });

    const invertInputType = () => setPasswordType(passwordType === "password" ? "text" : "password");
    const resetError = () => setError({ type: null, title: null });

    React.useEffect(() => {
        if (_.isNull(props.account.data) && !props.account.loading) {
            props.showAccount();
        }

        if (props.account.editAccountSuccess) {
            props.editAccountSuccessReset();

            props.createSuccess({
                headerTitle: "Passwort geändert",
                title:       "Ihr Passwort wurde erfolgreich geänder",
            });
            props.history.push("/success");
        }

        if (!_.isNil(props.account.error) && !props.account.loading && error.type !== "repeat") {
            if (_.get(props.account.error, "code") === "422" ) {
                resetFields();
                setError({ type: "account", title: "Altes Passwort falsch" });
                props.resetAccountError();
            }
        }
    });

    React.useEffect(() => props.resetAccountError, [ props.history ]);

    const changePassword = () => {
        resetError();
        if (newPassword !== repeatNewPassword) {
            setError({ type: "repeat", title: "Neue Passwörter sind unterschiedlich" });
            return resetFields();
        }

        props.editAccount({
            oldPassword,
            password: newPassword,
        });
    };

    const resetFields = () => {
        setOldPassword("");
        setNewPassword("");
        setRepeatNewPassword("");
        setPasswordType("password");
    };

    return (
        <>
            <Header title="Passwort ändern" offset={true} hideInfo={true}/>
            <ActionContainer
                className={error.title && !props.account.loading && "shake-animation"}
                offset={true}
                header={_.get(props.account.data, "email", "")}
                primaryDisabled={_.isEmpty(oldPassword) || _.isEmpty(newPassword) || _.isEmpty(repeatNewPassword) || props.account.loading}
                primaryTitle={!props.account.loading && "Passwort ändern"}
                primaryAction={changePassword}
                secondaryTitle="Abbrechen"
                secondaryTo="/"
            >
                <div className="mb-24">
                    <Label label="Altes Passwort" required={true}/>
                    <Input
                        value={oldPassword}
                        onChange={setOldPassword}
                        type={passwordType}
                        invalid={error.type === "account"}
                        resetError={resetError}
                    />
                </div>
                <div className="mb-24">
                    <Label label="Neues Passwort" required={true}/>
                    <Input
                        value={newPassword}
                        onChange={setNewPassword}
                        type={passwordType}
                        invalid={error.type === "repeat"}
                        resetError={resetError}
                    />
                </div>
                <div className="mb-24">
                    <Label label="Neues Passwort wiederholen" required={true}/>
                    <Input
                        value={repeatNewPassword}
                        onChange={setRepeatNewPassword}
                        type={passwordType}
                        invalid={error.type === "repeat"}
                        resetError={resetError}
                    />
                </div>
                <ToggleVisibility onClick={invertInputType} label="Anzeigen"/>
                {error.title && <Text type="error">{error.title}</Text>}
            </ActionContainer>
        </>
    );
};

const mapStateToProps = (state: ContextState): ChangePasswordStateProps => ({
    account: state.account,
});

export const ChangePassword = connect(mapStateToProps, {
    createSuccess:           SuccessAction.createSuccess,
    editAccount:             AccountAction.editAccount,
    editAccountSuccessReset: AccountAction.editAccountSuccessReset,
    resetAccountError:       AccountAction.resetAccountError,
    showAccount:             AccountAction.showAccount,
})(ChangePasswordLayout);
