import { ClassName } from "../../../utils/react";

export interface CardNumberProps extends ClassName {
    cardNumber: number | string;
    strong?: boolean;
}
