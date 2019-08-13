import { ClassName, PartialChildren } from "../../../utils/react";

export interface ContainerProps
    extends PartialChildren, ClassName {
    offset?: boolean;
    fullWidth?: boolean;
}
