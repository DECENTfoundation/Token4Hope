import * as React from "react";

import { TableProps } from "./TableProps";

import { renderClassConditions } from "../../../helpers/classes/ClassRenderer";

import "./styles.scss";

export const Table = ({ fullWidth, striped, className, children }: TableProps) => {
    return (
        <div className={renderClassConditions("table-wrapper", {"full-width": fullWidth})}>
            <table className={renderClassConditions("table-wrapper__table", {"full-width": fullWidth, striped}, className)}>
                {children}
            </table>
        </div>
    );
};
