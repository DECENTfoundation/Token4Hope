import * as React from "react";

import { TableCellProps } from "./TableCellProps";

import "../styles.scss";

export const TableCell = ({ children }: TableCellProps) => {
    return (
        <td className="table-wrapper__table__cell">
            {children}
        </td>
    );
};
