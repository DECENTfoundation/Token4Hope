import * as React from "react";

import { Link, withRouter } from "react-router-dom";

import { Button } from "../../base/button";
import { HorizontalFlow } from "../../base/flow/horizontal";
import { VerticalFlow } from "../../base/flow/vertical";
import { Text } from "../../base/text";
import { Logo } from "../../items/logo";
import { Navigation } from "../navigation";

import { renderClassConditions } from "../../../helpers/classes/ClassRenderer";

import { HeaderProps } from "./HeaderProps";

import "./styles.scss";

const backChevron = require("./images/back-chevron.svg");

const HeaderPage = ({ title, className, children, hideInfo, backAction, history, offset, large, success, error, logo }: HeaderProps) => {
    return (
        <VerticalFlow spacing="center" verticalAlign="center" className={renderClassConditions("header", { success, error })}>
            <HorizontalFlow
                fullWidth={true}
                verticalAlign="flex-start"
                className={renderClassConditions("header__wrapper", { offset }, className)}
            >
                <HorizontalFlow className="header__wrapper__container" fullWidth={true}>
                    {backAction && <img className="header__wrapper__back-chevron" src={backChevron} onClick={history.goBack}/>}
                    <Link to="/">
                        <Logo className={logo && "logo--show"}/>
                    </Link>
                    <Text className={renderClassConditions("header__wrapper__title", { large, error })} type="h3">{title}</Text>
                    {!hideInfo && <Navigation/>}
                </HorizontalFlow>
            </HorizontalFlow>
            {large && <div className={renderClassConditions("header__wrapper__extended", { offset })}>
                {backAction &&
                <Button className="header__wrapper__extended__back-button no-print" arrow="left" onClick={history.goBack}>Zurück</Button>}
                {title ? <Text className="header__wrapper__extended__title" type="h3">{title}</Text> :
                    <VerticalFlow spacing="center" className="header__wrapper__extended__children">{children}</VerticalFlow>}
            </div>}
            {offset && <div className="header__wrapper__offset"/>}
        </VerticalFlow>
    );
};

export const Header = withRouter(HeaderPage);
