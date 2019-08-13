import { RouteComponentProps } from "react-router";
import { Action } from "redux";
import { ErrorState } from "../../../models/error";

export type ErrorProps = ErrorStateProps & ErrorDispatchProps & RouteComponentProps<{}>;

export interface ErrorStateProps {
    error: ErrorState;
}

export interface ErrorDispatchProps {
    resetError: () => Action;
}
