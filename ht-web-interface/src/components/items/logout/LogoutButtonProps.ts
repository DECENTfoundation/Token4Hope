import { RouteComponentProps } from "react-router";

import { Action } from "../../../utils/redux";

export interface LogoutButtonProps extends RouteComponentProps<{}> {
    logout: () => Action;
}
