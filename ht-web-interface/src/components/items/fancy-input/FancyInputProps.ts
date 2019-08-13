export interface FancyInputProps {
    type?: FancyInputPropsType;
    length: number;
    value?: string;
    onChange?: (value: string) => any;
    resetError?: () => void;
    blurFocus?: () => void;
    valid?: boolean;
}

export type FancyInputPropsType = "password" | "number" | "text" | "tel";
