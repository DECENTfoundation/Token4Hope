import { includes } from "lodash";
import * as React from "react";

import { FormattedHTMLMessage } from "react-intl";

import { BackIcon } from "../../items/back-icon";
import { Chevron } from "../../items/chevron";
import { Loader } from "../../items/loader";
import { ConditionalLink } from "../conditional-link";
import { HorizontalFlow } from "../flow/horizontal";

import { renderClassConditions } from "../../../helpers/classes/ClassRenderer";

import { ButtonProps } from "./ButtonProps";
import { ButtonType } from "./ButtonType";

import "./styles.scss";

export const Button = ({ disabled, onClick, arrow, id, defaultMessage, children, messageValues, type, className, to }: ButtonProps) => {
    type = type || ButtonType.Primary;
    const body = <span>{children ? children : <Loader className="button__loader" loading={true}/>}</span>;
    return (
        <div
            onClick={!disabled ? onClick : null}
            className={renderClassConditions("button", { [ type ]: type, [ `${type}--disabled` ]: disabled }, className)}
        >
            <ConditionalLink to={to} className="button__link">
                <HorizontalFlow className="button__wrapper">
                    {arrow === "left" && <BackIcon disabled={disabled}/>}
                    {id ? <FormattedHTMLMessage id={id} defaultMessage={defaultMessage || children as string} values={messageValues}/>
                        : body}
                    {includes([ "right", "bottom" ], arrow) && renderChevron({ arrow, type, disabled })}
                </HorizontalFlow>
            </ConditionalLink>
        </div>
    );
};

const renderChevron = ({ arrow, type, disabled }: ButtonProps) => {
    return (
        <div className="button__chevron-wrapper">
            <Chevron
                disabled={disabled}
                type={type}
                className={renderClassConditions("button__chevron-wrapper__chevron", { bottom: arrow === "bottom" })}
            />
        </div>
    );
};
