import { Action } from "../../utils/redux";
import { Family } from "../family";
import { PaymentEvent } from "./PaymentEvent";

export class PaymentAction {

    public static resetPayment = (): Action => {
        return { type: PaymentEvent.Reset };
    }

    public static create(payload: Family): Action<Family> {
        return { type: PaymentEvent.Create, payload };
    }
}
