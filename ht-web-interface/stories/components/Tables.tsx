import * as React from "react";

import { Table } from "../../src/components/base/table";
import { TableBody } from "../../src/components/base/table/body";
import { TableCell } from "../../src/components/base/table/cell";
import { TableHead } from "../../src/components/base/table/head";
import { TableHeadCell } from "../../src/components/base/table/head-cell";
import { TableRow } from "../../src/components/base/table/row";
import { Text } from "../../src/components/base/text";
import { DataList } from "../../src/components/items/dataList";

const dataMock = [["Amount", "123 HT"], ["Sender", "dw-91824919f571825f07da"], ["Recipient", "dw-31132asddf"], ["Balance", "123 HT"]];

export const Tables = () => {

    return (
        <div className="storybook__wrapper">
            <div className="storybook__divider" />
            <Text type="body2">Standard table</Text>
            <div className="storybook__divider" />
            <Table fullWidth={true} striped={true}>
                <TableHead>
                    <TableHeadCell>Account name</TableHeadCell>
                    <TableHeadCell>Account ID</TableHeadCell>
                    <TableHeadCell>Balance</TableHeadCell>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell><a href="#">dw-somaneustlinstrasse</a></TableCell>
                        <TableCell>SOMA - Neustlinstrasse</TableCell>
                        <TableCell>3,518 HT</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><a href="#">dw-somagrorstlingstrasse</a></TableCell>
                        <TableCell>SOMA - Grorstlingstrasse</TableCell>
                        <TableCell>4,013 HT</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><a href="#">dw-somafreudostrasse</a></TableCell>
                        <TableCell>SOMA - Freudostrasse</TableCell>
                        <TableCell>6,518 HT</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <div className="storybook__divider" />
            <Text type="body2">Data list</Text>
            <div className="storybook__divider" />
            <DataList data={dataMock}/>
        </div>
    );
};
