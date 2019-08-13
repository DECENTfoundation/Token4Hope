import { ObjectKeyLiteral } from "../../../utils/foundation/class";
import { ClassName, PartialChildren } from "../../../utils/react";

export interface TextProps
    extends PartialChildren, ClassName {
    type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body" | "body2" | "helper" | "caption" | "label" | "error";
    color?: string;
    noMargin?: boolean;
    id?: string;
    messageValues?: ObjectKeyLiteral;
    defaultMessage?: string;
}
