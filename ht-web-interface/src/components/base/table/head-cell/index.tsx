import * as React from "react";

import { TableHeadCellProps } from "./TableHeadCellProps";

import "../styles.scss";

export const TableHeadCell = ({ children }: TableHeadCellProps) => {
    return (
        <th className="table-wrapper__table__head__cell">
            {children}
        </th>
    );
};
