import { RouteProps } from "react-router";

import { ClassName } from "../../../utils/react";

export interface UserCardProps extends RouteProps, ClassName {
    email: string;
}
