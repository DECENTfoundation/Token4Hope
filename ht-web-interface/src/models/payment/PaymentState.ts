import { ExposeCreation, ExposeError, ExposeLoading } from "../../utils/expose";
import { Payment } from "./Payment";

export interface PaymentState extends ExposeError, ExposeLoading, ExposeCreation {
    data?: Payment;
}
