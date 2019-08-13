import * as _ from "lodash";
import * as React from "react";

import { Link, LinkProps } from "react-router-dom";

import { renderClass } from "../../../helpers/classes/ClassRenderer";

import "./styles.scss";

export const ConditionalLink = ({ to = "", children, className, ...rest }: LinkProps) => {

    if (!_.isEmpty(to)) {
        return (
            <Link className={renderClass("conditional-link", className)} {...rest} to={to}>
                {children}
            </Link>
        );
    }

    return <div className={renderClass("", className)}>{children}</div>;
};
