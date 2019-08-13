import * as React from "react";

import { TableCell } from "../../base/table/cell";
import { TableRow } from "../../base/table/row";

import { TablePlaceholderProps } from "./TablePlaceholderProps";

import "./styles.scss";

export const TablePlaceholder = ({ rows, columns }: TablePlaceholderProps) => {
    const renderCells = () => Array.from({ length: columns }, () => null).map((key, i) => (
        <TableCell key={i}><div className="table-placeholder__row"/></TableCell>
    ));

    const renderRows = () => Array.from({ length: rows }, () => null).map((key, i) => (
        <TableRow key={i}>{renderCells()}</TableRow>
    ));

    return <>{renderRows()}</>;
};
