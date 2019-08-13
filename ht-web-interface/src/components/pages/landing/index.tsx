import * as _ from "lodash";
import * as React from "react";

import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import { Button } from "../../base/button";
import { HorizontalFlow } from "../../base/flow/horizontal";
import { VerticalFlow } from "../../base/flow/vertical";
import { Text } from "../../base/text";

import { Header } from "../../layouts/header";

import { ContextState } from "../../../models/context";

import { Role } from "../../../utils/role";

import { LandingProps, LandingStateProps } from "./LandingProps";

import "./styles.scss";

const Landing = (props: LandingProps) => {
    if (!_.isNull(props.account.data)) {
        const role = props.account.data.roles[ 0 ];

        return <Redirect to={role === Role.Charity ? "/charity" : "/store"}/>;
    }
    return (
        <VerticalFlow className="landing">
            <Header logo={true} />
            <VerticalFlow className="landing__wrapper">
                <div className="landing__wrapper__image"/>
                <HorizontalFlow className="landing__wrapper__container" spacing="space-between" verticalAlign="center">
                    <VerticalFlow className="landing__wrapper__container__main">
                        <Text className="landing__wrapper__container__main__title" type="h2">
                            Wirtschaftliche Hilfe für jene, die sie benötigen.
                        </Text>
                        <Text className="landing__wrapper__container__main__text" type="body">
                            {/* tslint:disable:max-line-length */}
                            Im Mittelpunkt unserer Arbeit stehen der Mensch und seine Bedürfnisse. Wir achten seine Würde und Selbstbestimmung.
                        </Text>
                    </VerticalFlow>
                </HorizontalFlow>
            </VerticalFlow>
            <HorizontalFlow className="landing__wrapper__container" spacing="space-between" verticalAlign="center" wrap="wrap">
                <VerticalFlow className="landing__wrapper__container__info">
                    <Text className="landing__wrapper__container__info__title" type="h4">Kontostand einsehen</Text>
                    <Text className="landing__wrapper__container__info__text" type="body">
                        Überprüfen Sie Ihren Kontostand.
                    </Text>
                </VerticalFlow>
                <Link to="/balance" className="landing__wrapper__container__info__cta">
                    <Button arrow="right">Kontostand einsehen</Button>
                </Link>
            </HorizontalFlow>
        </VerticalFlow>
    );
};

const mapStateToProps = (state: ContextState): LandingStateProps => ({
    account: state.account,
});

export const LandingPage = connect(mapStateToProps)(Landing);
