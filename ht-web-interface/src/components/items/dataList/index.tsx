import { map } from "lodash";
import * as React from "react";

import { Table } from "../../base/table";
import { TableBody } from "../../base/table/body";
import { TableCell } from "../../base/table/cell";
import { TableRow } from "../../base/table/row";

import { DataListProps } from "./DataListProps";

import "./styles.scss";

export const DataList = ({ data, fullWidth }: DataListProps) => {
    const renderCells = (cells: string[]) => map(cells, (cell, key) => <TableCell {...{key}}>{cell}</TableCell>);
    const renderRows = map(data, (cells, key) => <TableRow {...{key}}>{renderCells(cells)}</TableRow>);
    return (
        <Table {...{fullWidth}} className="data-list">
            <TableBody>
                {renderRows}
            </TableBody>
        </Table>
    );
};
