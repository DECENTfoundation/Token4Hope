import * as React from "react";

import * as ReactTooltip from "react-tooltip";

import { Info } from "../info-icon";

import { TooltipProps } from "./TooltipProps";

import "./styles.scss";

export const Tooltip = ({ label, id }: TooltipProps) => {
    return (
        <>
            <span data-tip="" data-for={id} className="tooltip__icon-wrapper">
                <Info />
            </span>
            <ReactTooltip className="tooltip" id={id} >
                <span>{label}</span>
            </ReactTooltip>
        </>
    );
};
