import { ClassName } from "../../../utils/react";

export interface InputProps extends ClassName {
    type: InputType;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    invalid?: boolean;
    autoFocus?: boolean;
    step?: string;
    value?: any;
    onChange?: (e: any) => void;
    resetError?: () => void;
}

export type InputType = "text" | "number" | "password" | "email" | "checkbox" | "tel";
