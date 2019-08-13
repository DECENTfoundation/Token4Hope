import { ActionsObservable } from "redux-observable";
import { Observable } from "rxjs";
import { mergeMap, takeUntil } from "rxjs/operators";

import { container } from "../../../assembly/Bootstrap";
import { Transactions, TransactionsEvent } from "../../../models/transactions";
import { LifecycleEvent } from "../../../utils/lifecycle";
import { Action } from "../../../utils/redux";
import { RxAction } from "../../../utils/rx";

import { TransactionsService } from "../TransactionsService";

export class TransactionsActionFactory {

    private static get service(): TransactionsService {
        return container.get(TransactionsService);
    }

    public static buildShow(): (action$: ActionsObservable<Action>) => Observable<Action<Transactions>> {
        return (action$: ActionsObservable<Action>): Observable<Action<Transactions>> => {
            return action$.ofType(TransactionsEvent.Show).pipe(
                mergeMap((obj: Action<Transactions>) => RxAction(this.service.show(obj.payload, obj.payload.params), {
                    failure: TransactionsEvent.ShowFailure,
                    success: TransactionsEvent.ShowSuccess,
                }).pipe(
                    takeUntil(action$.ofType(LifecycleEvent.Dispose, TransactionsEvent.Show)),
                )),
            );
        };
    }
}
