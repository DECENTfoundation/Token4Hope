import { ActionsObservable } from "redux-observable";
import { Observable } from "rxjs";
import { mergeMap, takeUntil } from "rxjs/operators";

import { container } from "../../../assembly/Bootstrap";
import { Balance, BalanceEvent } from "../../../models/balance";
import { LifecycleEvent } from "../../../utils/lifecycle";
import { Action } from "../../../utils/redux";
import { RxAction } from "../../../utils/rx";

import { BalanceCardService } from "../BalanceCardService";

export class BalanceCardActionFactory {

    private static get service(): BalanceCardService {
        return container.get(BalanceCardService);
    }

    public static buildShow(): (action$: ActionsObservable<Action>) => Observable<Action<Balance>> {
        return (action$: ActionsObservable<Action>): Observable<Action<Balance>> => {
            return action$.ofType(BalanceEvent.ShowByCard).pipe(
                mergeMap((obj: Action<Balance>) => RxAction(this.service.show(obj.payload), {
                    failure: BalanceEvent.ShowByCardFailure,
                    success: BalanceEvent.ShowByCardSuccess,
                }).pipe(
                    takeUntil(action$.ofType(LifecycleEvent.Dispose, BalanceEvent.ShowByCard)),
                )),
            );
        };
    }
}
