import * as React from "react";

import { ClassName, PartialChildren } from "../../../utils/react";

export interface ActionContainerProps extends ClassName, PartialChildren {
    fullWidth?: boolean;
    offset?: boolean;
    primaryDisabled?: boolean;
    primaryHighlighted?: boolean;
    backArrow?: boolean;
    primaryTo?: string;
    secondaryTo?: string;
    primaryTitle: string;
    secondaryTitle?: string;
    primaryAction?: () => void;
    secondaryAction?: () => void;
    header?: React.ReactNode | Element[] | Element | JSX.Element | JSX.Element[];
}
