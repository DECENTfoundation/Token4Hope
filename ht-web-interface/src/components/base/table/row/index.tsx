import * as React from "react";

import { TableRowProps } from "./TableRowProps";

import "../styles.scss";

export const TableRow = ({ children }: TableRowProps) => {
    return (
        <tr className="table-wrapper__table__row">
            {children}
        </tr>
    );
};
