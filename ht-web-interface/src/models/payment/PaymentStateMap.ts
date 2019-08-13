import { PaymentState } from "./PaymentState";

export interface PaymentStateMap {
    [ key: string ]: () => PaymentState;
}
