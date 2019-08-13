import * as React from "react";

import { HorizontalFlow } from "../../base/flow/horizontal";

import { renderClassConditions } from "../../../helpers/classes/ClassRenderer";

import { ToggleVisibilityProps } from "./ToggleVisibilityProps";

import "./styles.scss";

export const ToggleVisibility = ({ label, onClick, className }: ToggleVisibilityProps) => {
    const [ active, setActive ] = React.useState(false);

    const handleClick = () => {
        onClick();
        setActive(!active);
    };

    return (
        <HorizontalFlow
            onClick={handleClick}
            className={renderClassConditions("toggle-visibility", { active }, className)}
        >
            <svg width="16px" height="12px" viewBox="0 0 16 12" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    {/*tslint:disable-next-line:max-line-length*/}
                    <path d="M12.0001275,8 C14.8391275,8 17.0361275,10.835 17.8181275,12 C17.0341275,13.166 14.8371275,16 12.0001275,16 C9.15912749,16 6.96212749,13.162 6.18112749,11.999 C6.95812749,10.835 9.14612749,8 12.0001275,8 M12.0001275,18 C7.26912749,18 4.25412749,12.713 4.12812749,12.489 C3.95812749,12.186 3.95712749,11.817 4.12612749,11.514 C4.25112749,11.289 7.24512749,6 12.0001275,6 C16.7311275,6 19.7461275,11.287 19.8721275,11.512 C20.0431275,11.816 20.0421275,12.188 19.8711275,12.492 C19.7441275,12.716 16.7071275,18 12.0001275,18 Z M12,14 C14.209139,14 16,12.6568542 16,11 C16,9.34314575 14.209139,8 12,8 C9.790861,8 8,9.34314575 8,11 C8,12.6568542 9.790861,14 12,14 Z M11,11 C10.4477153,11 10,10.5522847 10,10 C10,9.44771525 10.4477153,9 11,9 C11.5522847,9 12,9.44771525 12,10 C12,10.5522847 11.5522847,11 11,11 Z" id="path-1"/>
                </defs>
                <g id="All-screens" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="styleguides" transform="translate(-248.000000, -3003.000000)">
                        <g id="Group-7" transform="translate(29.000000, 2936.000000)">
                            <g id="icons-/-24px-/-show" transform="translate(215.000000, 61.000000)">
                                <rect id="container" fillOpacity="0" fill="#EAF6ED" x="0" y="0" width="24" height="24"/>
                                <use id="icon" className="toggle-visibility__icon" href="#path-1"/>
                            </g>
                        </g>
                    </g>
                </g>
            </svg>
            <span className="ml-8">{label}</span>
        </HorizontalFlow>
    );
};
