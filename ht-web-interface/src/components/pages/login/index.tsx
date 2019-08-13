import * as _ from "lodash";
import * as React from "react";

import { connect } from "react-redux";

import { Input } from "../../base/input";
import { Label } from "../../base/label";
import { Text } from "../../base/text";
import { ActionContainer } from "../../items/action-container";
import { FancyInputPropsType } from "../../items/fancy-input/FancyInputProps";
import { ToggleVisibility } from "../../items/toggle-visibility";
import { Header } from "../../layouts/header";

import { AccountAction } from "../../../models/account";
import { ContextState } from "../../../models/context";
import { SessionAction } from "../../../models/session";

import { renderClass } from "../../../helpers/classes/ClassRenderer";
import { Role } from "../../../utils/role";
import { ValidationRegex } from "../../../utils/validation/Regex";

import { LoginProps, LoginStateProps } from "./LoginProps";

import "./styles.scss";

const Login = (props: LoginProps) => {
    const [ email, setEmail ] = React.useState("");
    const [ password, setPassword ] = React.useState("");
    const [ pinType, setPinType ] = React.useState<FancyInputPropsType>("password");
    const [ error, setError ] = React.useState({ type: null, title: null });

    React.useEffect(() => {
        if (!_.isNull(props.session.data) && _.isNull(props.account.data)) {
            props.showAccount();
        }

        if (!_.isNull(props.account.data)) {
            if (_.includes(props.account.data.roles, Role.Charity)) {
                props.history.push("/charity");
            }

            if (_.includes(props.account.data.roles, Role.Store)) {
                props.history.push("/store");
            }

        }

        if (!_.isNil(props.session.error) && !props.session.loading) {
            if (_.get(props.session.error, "code") === "422" ) {
                setError({ type: "account", title: "Ungültige Email oder Passwort!" });
            }
        }

    }, [ props.session, props.account.data ]);

    React.useEffect(() => props.resetSessionError, [ props.history ]);

    const resetError = () => setError({ type: null, title: null });

    const invertPinType = () => setPinType(pinType === "password" ? "text" : "password");
    const handleSubmit = () => {
        const validEmail = ValidationRegex.email.test(email);
        resetError();
        if (validEmail) {
            props.login({ email, password });
        } else {
            setError({ type: "email", title: "Email nicht richtig!" });
        }
    };

    const Form = (
        <ActionContainer
            primaryAction={handleSubmit}
            className={renderClass("login-form", !props.session.loading && error.title && "shake-animation")}
            primaryDisabled={_.isEmpty(password) || _.isEmpty(email) || props.session.loading}
            primaryTitle={!props.session.loading && "Login"}
            secondaryTitle="Abbrechen"
            secondaryTo="/"
        >
            <div>
                <Label label="Email" required={true}/>
                <Input
                    value={email}
                    onChange={setEmail}
                    autoFocus={true}
                    className="login-form__input"
                    type="email"
                    invalid={_.includes(["email", "account"], error.type)}
                    resetError={resetError}
                />
            </div>
            <div className="mt-24">
                <Label label="Passwort" required={true}/>
                <Input
                    value={password}
                    onChange={setPassword}
                    className="login-form__input"
                    type={pinType}
                    invalid={error.type === "account"}
                    resetError={resetError}
                />
            </div>
            <ToggleVisibility className="mt-24" label={pinType === "password" ? "Anzeigen" : "Verstecken"} onClick={invertPinType}/>
            {error.title && <Text type="error">{error.title}</Text>}
        </ActionContainer>
    );

    return (
        <>
            <Header title="Login" hideInfo={true}/>
            {Form}
        </>
    );
};

const mapStateToProps = (state: ContextState): LoginStateProps => ({
    account: state.account,
    session: state.session,
});

export const LoginPage = connect(mapStateToProps, {
    login: SessionAction.signin,
    resetSessionError: SessionAction.resetSessionError,
    showAccount: AccountAction.showAccount,
})(Login);
