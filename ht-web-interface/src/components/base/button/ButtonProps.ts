import { ObjectKeyLiteral } from "../../../utils/foundation/class";

import { ButtonType } from "./ButtonType";

export interface ButtonProps {
    className?: string;
    onClick?: () => void;
    id?: string;
    disabled?: boolean;
    defaultMessage?: string;
    children?: any;
    messageValues?: ObjectKeyLiteral;
    arrow?: "left" | "right" | "bottom";
    type?: ButtonType;
    to?: string;
}
