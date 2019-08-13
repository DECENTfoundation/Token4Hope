import { ClassName } from "../../../utils/react";

export interface ToggleVisibilityProps extends ClassName {
    label: string;
    onClick?: () => void;
}
