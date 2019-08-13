import * as React from "react";

import { BackIconProps } from "./BackIconProps";

import "./styles.scss";

export const BackIcon = ({ className, disabled }: BackIconProps) => {
    return (
        <span className={`${className} back-icon`}>
            <svg width="16px" height="14px" viewBox="0 0 16 14" version="1.1">
                <g id="All-screens" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="styleguides" transform="translate(-132.000000, -3002.000000)">
                        <g id="Group-7" transform="translate(29.000000, 2936.000000)">
                            <g id="icons-/-24px-/-back" transform="translate(99.000000, 61.000000)">
                                <g id="ico_back">
                                    <rect id="container" fillOpacity="0" x="0" y="0" width="24" height="24" />
                                    <polygon
                                        id="icon"
                                        className={`${disabled ? "back-icon--disabled" : "back-icon--enabled"}`}
                                        points="10.7 18.4 12.1 17 7.8 12.7 20 12.7 20 10.7 7.8 10.7 12.1 6.4 10.7 5 4 11.7"
                                    />
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
            </svg>
        </span>
    );
};
