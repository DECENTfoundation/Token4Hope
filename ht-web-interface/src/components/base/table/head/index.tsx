import * as React from "react";

import { TableHeadProps } from "./TableHeadProps";

import "../styles.scss";

export const TableHead = ({ children }: TableHeadProps) => {
    return (
        <thead className="table-wrapper__table__head">
            <tr className="table-wrapper__table__head__row">
                {children}
            </tr>
        </thead>
    );
};
