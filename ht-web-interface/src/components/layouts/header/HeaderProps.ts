import { RouteComponentProps } from "react-router";
import { ClassName, PartialChildren } from "../../../utils/react";

export interface HeaderProps extends ClassName, PartialChildren,  RouteComponentProps<{}> {
    hideInfo?: boolean;
    success?: boolean;
    error?: boolean;
    large?: boolean;
    offset?: boolean;
    backAction?: boolean;
    logo?: boolean;
    title?: string;
}
