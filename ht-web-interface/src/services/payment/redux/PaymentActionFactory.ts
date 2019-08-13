import { ActionsObservable } from "redux-observable";
import { Observable } from "rxjs";
import { mergeMap, takeUntil } from "rxjs/operators";

import { container } from "../../../assembly/Bootstrap";

import { Payment, PaymentEvent } from "../../../models/payment";

import { LifecycleEvent } from "../../../utils/lifecycle";
import { Action } from "../../../utils/redux";

import { RestPath } from "../../base/rest";

import { RxSessionAction } from "../../session/rx/RxSessionAction";

import { PaymentService } from "../PaymentService";

export class PaymentActionFactory {

    private static get service(): PaymentService {
        return container.get(PaymentService);
    }

    public static buildCreate(): (action$: ActionsObservable<Action<Payment>>) => Observable<Action<Payment>> {
        return (action$: ActionsObservable<Action<Payment>>): Observable<Action<Payment>> => {
            return action$.ofType(PaymentEvent.Create).pipe(
                mergeMap((obj: Action<Payment>) => RxSessionAction(this.service.create(RestPath.Pattern, obj.payload as Payment), {
                    failure: PaymentEvent.CreateFailure,
                    success: PaymentEvent.CreateSuccess,
                }).pipe(
                    takeUntil(action$.ofType(LifecycleEvent.Dispose, PaymentEvent.Create)),
                )),
            );
        };
    }
}
