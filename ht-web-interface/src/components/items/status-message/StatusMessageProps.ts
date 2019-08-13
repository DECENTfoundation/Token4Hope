import { ClassName } from "../../../utils/react";

export interface StatusMessageProps extends ClassName {
    success: boolean;
    title: string;
    subTitle?: string;
    vertical?: boolean;
}
