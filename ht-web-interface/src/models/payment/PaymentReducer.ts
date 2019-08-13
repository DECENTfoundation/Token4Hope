import { Action } from "../../utils/redux";
import { Payment } from "./Payment";
import { PaymentEvent } from "./PaymentEvent";
import { PaymentState } from "./PaymentState";
import { PaymentStateMap } from "./PaymentStateMap";

const InitialState: PaymentState = { data: null, loading: false, actionCreated: false };

export const PaymentReducer = (state: PaymentState = InitialState, action: Action<Payment>) => {
    const map = {
        [ PaymentEvent.Reset ]:         () => InitialState,
        [ PaymentEvent.Create ]:        () => ({ ...state, loading: true, actionCreated: true }),
        [ PaymentEvent.CreateSuccess ]: () => ({ ...state, loading: false, error: null, data: action.payload }),
        [ PaymentEvent.CreateFailure ]: () => ({ ...state, loading: false, error: action.payload }),
    } as PaymentStateMap;
    return map[ action.type ] ? map[ action.type ]() : state;
};
