import * as React from "react";

import { TableBodyProps } from "./TableBodyProps";

import "../styles.scss";

export const TableBody = ({ children }: TableBodyProps) => {
    return (
        <tbody className="table-wrapper__table__body">
            {children}
        </tbody>
    );
};
