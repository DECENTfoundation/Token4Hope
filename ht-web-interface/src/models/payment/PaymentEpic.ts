import { combineEpics } from "redux-observable";

import { PaymentActionFactory } from "../../services/payment/redux/PaymentActionFactory";

export const PaymentEpics = combineEpics(...[
    PaymentActionFactory.buildCreate(),
]);
