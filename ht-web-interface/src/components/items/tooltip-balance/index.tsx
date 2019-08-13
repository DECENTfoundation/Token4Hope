import * as React from "react";

import { HorizontalFlow } from "../../base/flow/horizontal";
import { VerticalFlow } from "../../base/flow/vertical";
import { Text } from "../../base/text";
import { Balance } from "../balance";
import { BalanceType } from "../balance/BalanceType";
import { Tooltip } from "../tooltip";

import { renderClass } from "../../../helpers/classes/ClassRenderer";

import { TooltipBalanceProps } from "./TooltipBalanceProps";

import "./styles.scss";

export const TooltipBalance = ({ title, label, value, className }: TooltipBalanceProps) => {
    return (
        <VerticalFlow className={renderClass("tooltip-balance", className)}>
            <HorizontalFlow verticalAlign="center" className="tooltip-balance__label">
                <Text type="body">{title}</Text>
                <Tooltip id={Math.random().toString()} label={label} />
            </HorizontalFlow>
            <Balance type={BalanceType.Secondary} value={value}/>
        </VerticalFlow>
    );
};
