import { Balance } from "../balance";

export interface Family extends Balance {
    cardNumber?: string;
    pin?: string;
}
