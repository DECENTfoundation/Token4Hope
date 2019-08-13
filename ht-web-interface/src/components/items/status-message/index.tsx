import * as React from "react";

import { FormattedHTMLMessage } from "react-intl";

import { StatusMessageProps } from "./StatusMessageProps";

import { HorizontalFlow } from "../../base/flow/horizontal";
import { VerticalFlow } from "../../base/flow/vertical";
import { Text } from "../../base/text";

import { renderClassConditions } from "../../../helpers/classes/ClassRenderer";

import "./styles.scss";

const successIcon = require("./images/ico_success.svg");
const errorIcon = require("./images/ico_deny.svg");

export const StatusMessage = ({ success, title, subTitle, vertical }: StatusMessageProps) => {
    return (
        <VerticalFlow spacing="center" className="status-message" verticalAlign="center">
            <HorizontalFlow className={renderClassConditions("status-message", { vertical })}>
                <img src={success ? successIcon : errorIcon} className="status-message__icon"/>
                <Text type="body" className={renderClassConditions("status-message__title", {error: !success})}> {title} </Text>
            </HorizontalFlow>
            {subTitle && <Text type="body" className="status-message__subtitle">
                <FormattedHTMLMessage defaultMessage={subTitle} id="-" />
            </Text>}
        </VerticalFlow>
    );
};
