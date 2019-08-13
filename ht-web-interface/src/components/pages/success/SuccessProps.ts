import { RouteComponentProps } from "react-router";
import { Action } from "redux";
import { SuccessState } from "../../../models/success";

export type SuccessProps = SuccessStateProps & SuccessDispatchProps & RouteComponentProps<{}>;

export interface SuccessStateProps {
    success: SuccessState;
}

export interface SuccessDispatchProps {
    resetSuccess: () => Action;
}
