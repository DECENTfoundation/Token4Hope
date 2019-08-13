import * as _ from "lodash";
import * as React from "react";

import { Redirect } from "react-router";

import { ActionContainerProps } from "./ActionContainerProps";

import { Button } from "../../base/button";
import { ButtonType } from "../../base/button/ButtonType";
import { Container } from "../../base/container";
import { HorizontalFlow } from "../../base/flow/horizontal";
import { VerticalFlow } from "../../base/flow/vertical";

import { renderClassConditions } from "../../../helpers/classes/ClassRenderer";

import "./styles.scss";

export const ActionContainer = (props: ActionContainerProps) => {
    {/*tslint:disable-next-line:max-line-length*/}
    const { fullWidth, primaryTitle, primaryTo, secondaryTitle, secondaryTo, primaryAction, primaryDisabled, primaryHighlighted, secondaryAction, backArrow, children, offset, header, className } = props;
    const singleAction = _.isNil(secondaryTitle);
    const arrow = backArrow ? "left" : null;

    React.useEffect(() => {
        document.onkeydown = (e) => {
            if (e.key === "Enter" && !primaryDisabled) {
                if (primaryTo) {
                    return <Redirect to={primaryTo}/>;
                }
                primaryAction();
            }
        };
    });

    return (
            <Container
                fullWidth={fullWidth}
                offset={offset}
                className={renderClassConditions("action-container", {header, "header-offset": header && offset}, className)}
            >
                {header && <HorizontalFlow className="action-container__header-item" spacing="center">{header}</HorizontalFlow>}
                <VerticalFlow className="action-container__wrapper" spacing="center">
                    {children}
                </VerticalFlow>
                <HorizontalFlow className="action-container__actions">
                    {!singleAction && (
                        <Button {...{ arrow }} type={ButtonType.Tertiary} onClick={secondaryAction} to={secondaryTo}>
                            {secondaryTitle}
                        </Button>
                    )}
                    <Button
                        className={renderClassConditions(`button__action`, {highlighted: primaryHighlighted, single: singleAction})}
                        disabled={primaryDisabled}
                        type={ButtonType.Primary}
                        onClick={primaryAction}
                        to={primaryTo}
                        arrow="right"
                    >
                       {primaryTitle}
                    </Button>
                </HorizontalFlow>
            </Container>
    );
};
