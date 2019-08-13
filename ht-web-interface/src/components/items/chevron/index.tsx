import * as React from "react";

import { ButtonType } from "../../base/button/ButtonType";

import { ChevronProps } from "./ChevronProps";

import "./styles.scss";

export const Chevron = ({ type, className, disabled }: ChevronProps) => {
    return (
        <span className={`${className} chevron`}>
            <svg width="5px" height="8px" viewBox="0 0 5 8" version="1.1">
                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="chevron" transform="translate(-2.000000, 0.000000)">
                        <rect id="container" fillOpacity="0" x="0" y="0" width="8" height="8" />
                        <polygon
                            id="icon"
                            className={addClasses({ type, disabled })}
                            points="3.0294118 8 2 6.962963 4.9411765 4 2 1.03703704 3.0294118 0 7 4"
                        />
                    </g>
                </g>
            </svg>
        </span>
    );
};

const addClasses = ({ type, disabled }: ChevronProps) => {
    type = type || ButtonType.Primary;

    if (disabled) {
        return `chevron--${type}--disabled`;
    }

    return `chevron--${type}`;
};
