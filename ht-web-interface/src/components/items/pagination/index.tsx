import * as _ from "lodash";
import * as Qs from "qs";
import * as React from "react";

import { withRouter } from "react-router";

import { TablePagination } from "@material-ui/core";

import { HistoryFactory } from "../../../helpers/history";

import { PaginationProps } from "./PaginationProps";

import "./styles.scss";

class Pagination extends React.Component<PaginationProps, {}> {

    public render() {
        const { source, count } = this.props.list;
        let { limit, offset } = Qs.parse(this.props.location.search, { ignoreQueryPrefix: true });

        limit = parseInt(limit, 10) || 10;
        offset = parseInt(offset, 10) || 0;

        if (_.isEmpty(source)) {
            return null;
        }

        return (
            <TablePagination
                className="pagination-item"
                component="div"
                nextIconButtonProps={{ disabled: count <= (limit + offset) }}
                count={count}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 25, 100]}
                page={Math.round(offset / limit)}
                classes={{ caption: "pagination-item__caption", select: "pagination-item__select", actions: "pagination-item__actions" }}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
        );
    }

    private handleChangePage = (event?: any, currentPage?: number) => {
        let { limit } = Qs.parse(this.props.location.search, { ignoreQueryPrefix: true });

        limit = parseInt(limit, 10) || 10;

        HistoryFactory.attemptAppendQuery(this.props, { limit, offset: limit * currentPage });
    }

    private handleChangeRowsPerPage = (event: any) => {
        HistoryFactory.attemptAppendQuery(this.props, { limit: event.target.value });
    }

}

export const PaginationItem = withRouter(Pagination);
