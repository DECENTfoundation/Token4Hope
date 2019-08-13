import { RouteComponentProps } from "react-router";

import { ListPayload } from "../../../utils/data";
import { ListParams } from "../../../utils/data";

export interface PaginationProps extends RouteComponentProps<ListParams> {
    list: ListPayload<any>;
}
